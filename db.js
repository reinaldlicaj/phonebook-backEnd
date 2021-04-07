const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UserDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (!err) {
        console.log('Succesfully connected to MongoDB');
    }
    else {
        console.log(err);
    }

});

require('./models/user');