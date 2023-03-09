const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    profileID: {
        type: Number,
        required: true,
    },
    fisrtName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
    }, 
    profilePicture: {
        type: String
    },
})

exports.Profile = mongoose.model('Profile', profileSchema)