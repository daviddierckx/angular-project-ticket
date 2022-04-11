
const mongoose = require('mongoose');


// Festival Schema

const Festival = mongoose.model('Festival', {


    id: {
        type: String,
        required: true
    },
    Naam: {
        type: String,
        required: true
    },
    MaxAantalBezoekers: {
        type: Number,
        required: true
    },
    Artiesten: {
        type: String,
        required: true
    },
    isUnderAge: {
        type: Boolean,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
})

module.exports = { Festival }