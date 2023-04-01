const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    base: {
        HP: {
            type: Number,
            required: true,
            min: 0,
        },
        Attack: {
            type: Number,
            required: true,
            min: 0,
        },
        Defense: {
            type: Number,
            required: true,
            min: 0,
        },
        Speed: {
            type: Number,
            required: true,
            min: 0,
        },
        "Speed Attack": {
            type: Number,
            required: true,
            min: 0,
        },
        "Speed Defense": {
            type: Number,
            required: true,
            min: 0,
        }
    },
    id: {
        required: true,
        type: Number,
        unique: true,
        min: 0
    },
    name: {
        english: {
            type: String,
            default: null,
            minlength: 0,
            maxlength: 20,
        },
        japanese: {
            type: String,
            default: null,
            minlength: 0,
            maxlength: 20,
        },
        chinese: {
            type: String,
            default: null,
            minlength: 0,
            maxlength: 20,
        },
        french: {
            type: String,
            default: null,
            minlength: 0,
            maxlength: 20,
        },
    },
    type: {
        required: true,
        type: [String],
        default: []
    },
    __v: {
        type: Number,
        required: true,
        default: 0
    }
})


const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon