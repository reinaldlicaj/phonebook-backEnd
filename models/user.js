const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    privateNumber: {
        type: String
    },
    workNumber: {
        type: String
    }
});

const User = module.exports = mongoose.model('Users', userSchema);