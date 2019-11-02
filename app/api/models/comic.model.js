const mongoose = require('mongoose');
const comicSchema = new mongoose.Schema({
    name: {
        typed: String,
        required: true,
        trim: true
    },
    image: {
        typed: String,
        required: true,
        trim: true
    },
    description: {
        typed: String,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('Comic', comicSchema, 'comics');