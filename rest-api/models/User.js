const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique:true
    },
    email: String,
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    myPets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }]

});

module.exports = mongoose.model('User', userSchema);
