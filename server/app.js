const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const Pokemon = require('./models/pokemon')
const db = require('./config/db')
const axios = require('axios')
const fs = require('fs')
const bodyParer = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const morgan = require('morgan');
const cors = require('cors');
const cookeParser = require('cookie-parser');
const { stats } = require('./controllers/StatsController')
const { login, logout, register, authenticate } = require('./controllers/AuthController')
const Stats = require('./models/Stat')


const app = express()
app.use(cookeParser());
app.use(bodyParer.json())
app.use(morgan('dev'))
// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'Library API',
//             version: '1.0.0',
//             description: "Pokemon API"
//         }
//     },
//     apis: ['app.js']
// }
app.use(cors({
    "origin": "*",
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', '*');
    // Allow client to send and recieve cookies
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});





// YOUTUBE URL
// https://youtu.be/5wdeFC5ARj8

const getPokemonData = async () => {
    let data
    const filePath = './assets/data.json'

    try {
        fs.accessSync(filePath, fs.constants.F_OK)
        data = fs.readFileSync(filePath, 'utf-8')
        data = JSON.parse(data)
    } catch (e) {
        console.log("FILE NOT FOUND")
        const res = await axios.get("https://api.github.com/repos/fanzeyi/pokemon.json/contents/pokedex.json")
        data = JSON.parse(Buffer.from(res.data.content, 'base64').toString())
        fs.writeFileSync(filePath, JSON.stringify(data))
    }
    console.log("Recieved data")

    return data;
}

const resetDB = async () => {
    // Clear DB
    await Pokemon.deleteMany();
    console.log("DB emptied")

    // Get New Data
    data = await getPokemonData();

    // Load Data
    for (let index = 0; index < data.length; index++) {
        temp = await Pokemon({
            id: data[index]['id'],
            name: data[index]['name'],
            base: data[index]['base'],
            type: data[index]['type']
        })
        temp.base["Speed Attack"] = parseFloat(data[index].base["Sp. Attack"])
        temp.base["Speed Defense"] = parseFloat(data[index].base["Sp. Defense"])
        await temp.save();
    }
}

app.post("/login", login, stats);
app.post("/logout", logout, stats);
app.post("/register", register, stats);


app.get('/pokemons', authenticate(undefined), async (req, res, next) => {

    console.log(req.query)

    // Pagination 
    const page = req.query.page || 0
    const limit = req.query.limit || 10
    const types = req.query.type || []
    const name = req.query.name || ""

    if (name != "" || types.length != 0) {
        res.locals = await Pokemon.find({
            $and: [
                { type: { $all: types } },
                { "name.english": { $regex: name, $options: 'i' } }
            ]
        }).skip(page * limit).limit(limit)
    } else {
        res.locals = await Pokemon.find().skip(page * limit).limit(limit)
    }

    // return res.send(res.locals.pokemon)
    next()
}, stats)


app.get('/stats', authenticate('admin'), async (req, res, next) => {

    // Get all stats to send to client
    const s = await Stats.find();
    console.log(s)
    res.locals = s

    next();

}, stats)

app.listen(5000, () => console.log("http://localhost:5000"))
