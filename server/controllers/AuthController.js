const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const Stat = require('../models/Stat')
const { promisify } = require("util");
const { stats } = require('./StatsController');

const ACCESS_TOKEN_SECRET = 'access-token-secret';
const REFRESH_TOKEN_SECRET = 'refresh-token-secret';
let REFRESH_TOKEN_ARR = [];


const login = async (req, res, next) => {
    // See if username and password are provided
    if (!req.body.email || !req.body.password) {
        res.statusCode = 400;
        res.locals.user = {
            message: 'Username and password are required'
        }
        return next()
    }

    // See if user exists
    const user = await User.findOne({ email: req.body.email });

    console.log("LOGIN")
    // See if user exists
    if (!user) {
        res.statusCode = 400;
        res.locals.data = {
            message: 'Username or password is incorrect'
        }
        return next()
    }

    // See if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.statusCode = 400;
        res.locals.data = {
            message: 'Username or password is incorrect'
        }
        return next()
    }

    // Create and assign a token and refresh token
    const [access, refresh] = createNewTokens(user);

    // Add tokens to headers
    res.header("auth-token", access);
    res.header("refresh-token", refresh);

    REFRESH_TOKEN_ARR.push(refresh);

    // Add res to res and then call next
    req.user = user;
    res.locals.user = user;
    next();
}

const logout = async (req, res, next) => {

    // See if refresh token is provided
    if (!req.body.refreshToken) {
        return res.status(400).json({
            message: 'Refresh token is required'
        });
    }

    // See if refresh token is valid
    let user;
    try {
        user = await promisify(jwt.verify)(req.body.refreshToken, REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    // See if refresh token is in array
    REFRESH_TOKEN_ARR = REFRESH_TOKEN_ARR.filter(thing => thing != req.body.refreshToken);

    res.send({ message: 'Logged out successfully' });
}

const register = async (req, res, next) => {

    // Check to see if username and password are provided
    if (!req.body.email || !req.body.password) {
        res.statusCode = 400;
        res.locals.data = {
            message: 'Username and password are required'
        }
        return next()
    }

    // Check to see if username is already taken
    const dupUser = await User.findOne({ email: req.body.email });
    if (dupUser) {
        res.statusCode = 400;
        res.locals.data = {
            message: 'Email already taken'
        }
        return next()
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({ email: req.body.email, password: hashedPassword, role: req.body.role });


    // Save user to database
    try {
        const savedUser = await newUser.save();
        res.statusCode = 201;
        res.locals = {
            message: 'User created successfully',
            user: savedUser
        }
    }
    catch (err) {
        console.log(err)
        res.statusCode = 400;
        res.locals.data = {
            message: 'Error creating user'
        }
    } finally {
        next();
    }
}

const authenticate = (role) => async (req, res, next) => {
    next = next ? next : res.send;
    // Need to see if token exist in headers
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    let [access, refresh] = req.headers.authorization.split(' ');
    access = access.split(":")[1];
    refresh = refresh.split(":")[1];

    // Need to see if token is valid
    try {
        let user = await promisify(jwt.verify)(access, ACCESS_TOKEN_SECRET);
        req.user = user
        console.log("HELLLLO AUTHENTICATE", user)
        if (!role || user.role == role)
            return next();
    } catch (err) {
    }


    // Check to see if refresh token is valid
    try {
        let user = await promisify(jwt.verify)(refresh, REFRESH_TOKEN_SECRET)
        // If valid create new tokens and attach to headers
        if (!role || user.role == role) {
            const [newAccess, newRefresh] = createNewTokens(user)
            req.user = user
            res.header("auth-token", newAccess)
            res.header("refresh-token", newRefresh)
            REFRESH_TOKEN_ARR = REFRESH_TOKEN_ARR.filter(thing => thing != refresh)
            REFRESH_TOKEN_ARR.push(newRefresh)
            return next()
        }
    } catch (err) {
    }

    res.statusCode = 401;
    res.locals.data = {
        message: 'Unauthorized'
    }

    return await stats(req, res)
}

const createNewTokens = (user) => {
    // Create and assign a token and refresh token
    const accessToken = jwt.sign({ _id: user._id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '3s' });
    const refreshToken = jwt.sign({ _id: user._id, role: user.role }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return [accessToken, refreshToken];
}

module.exports = {
    login,
    logout,
    REFRESH_TOKEN_ARR,
    register,
    authenticate
}
