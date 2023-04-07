const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { promisify } = require("util");

const ACCESS_TOKEN_SECRET = 'access-token-secret';
const REFRESH_TOKEN_SECRET = 'refresh-token-secret';
let REFRESH_TOKEN_ARR = [];


const login = async (req, res) => {

    console.log(req.headers)
    // See if username and password are provided
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    // See if user exists
    const user = await User.findOne({ email: req.body.email });

    // See if user exists
    if (!user) {
        return res.status(400).json({
            message: 'Username or password is incorrect'
        });
    }

    // See if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            message: 'Username or password is incorrect'
        });
    }

    // Create and assign a token and refresh token
    const [access, refresh] = createNewTokens(user);

    // Add tokens to headers
    res.header("auth-token", access);
    res.header("refresh-token", refresh);

    // Print all headers
    console.log(res.getHeaders());

    REFRESH_TOKEN_ARR.push(refresh);

    return res.send({ message: 'Logged in successfully', user: user });
}

const logout = async (req, res) => {
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

    // await User.deleteMany()

    console.log("GOT EM: ", req.body)
    // Check to see if username and password are provided
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    // Check to see if username is already taken
    const dupUser = await User.findOne({ email: req.body.email });
    console.log(dupUser)
    if (dupUser) {
        return res.status(400).json({
            message: 'Email already taken'
        });
    }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({ email: req.body.email, password: hashedPassword, type: req.body.type });

    console.log("NEW USER: ", newUser)

    // Save user to database
    try {
        const savedUser = await newUser.save();
        return res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            message: 'Error creating user'
        });
    }
}

const authenticate = (type) => async (req, res, next) => {
    next = next ? next : res.send;
    // Need to see if token exist in headers
    // console.log("AUTHENTICATE")
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    let [access, refresh] = req.headers.authorization.split(' ');
    access = access.split(":")[1];
    refresh = refresh.split(":")[1];

    // Need to see if token is valid
    try {
        let user = await promisify(jwt.verify)(access, ACCESS_TOKEN_SECRET);

        console.log("HELLLLO AUTHENTICATE", user)
        if (!type || user.type == type)
            return next();
    } catch (err) {
    }

    // Check to see if refresh token is valid
    try {
        let user = await promisify(jwt.verify)(refresh, REFRESH_TOKEN_SECRET)
        // If valid create new tokens and attach to headers
        if (!type || user.type == type) {
            const [newAccess, newRefresh] = createNewTokens(user)
            res.header("auth-token", newAccess)
            res.header("refresh-token", newRefresh)
            REFRESH_TOKEN_ARR = REFRESH_TOKEN_ARR.filter(thing => thing != refresh)
            REFRESH_TOKEN_ARR.push(newRefresh)
            return next()
        }
    } catch (err) {
    }
    return res.status(401).send({ message: 'Unauthorized' })
}

const createNewTokens = (user) => {
    // Create and assign a token and refresh token
    const accessToken = jwt.sign({ _id: user._id, type: user.type }, ACCESS_TOKEN_SECRET, { expiresIn: '3s' });
    const refreshToken = jwt.sign({ _id: user._id, type: user.type }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return [accessToken, refreshToken];
}

module.exports = {
    login,
    logout,
    REFRESH_TOKEN_ARR,
    register,
    authenticate
}
