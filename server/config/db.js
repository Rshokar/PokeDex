const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://bcit:j13B2z1ofdLYCn0V@cluster0.oskyzu1.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:27017/WEBDEV');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;

