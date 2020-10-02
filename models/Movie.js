const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim: true,
    },
    owner: {
        type: String,
        required: true,  
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Movie', movieSchema);