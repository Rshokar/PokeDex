const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    endpoint: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
})

const Stats = mongoose.model('Stats', StatSchema);

module.exports = Stats
