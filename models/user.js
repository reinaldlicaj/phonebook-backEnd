const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    numbers: {
        type: [{
            number: {
                type: String,
            },
            numberType: {
                type: String,
            },
        }],
    },
});

module.exports = mongoose.model("Users", userSchema);
