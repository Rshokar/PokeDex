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

const app = express()
app.use(bodyParer.json())
app.use(morgan('dev'))
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: "Pokemon API"
        }
    },
    apis: ['app.js']
}
app.use(cors())



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


app.get('/pokemons', async (req, res) => {
    const p = await Pokemon.find();
    return res.send(p);
})

app.listen(5000, () => console.log("http://localhost:5000"))
