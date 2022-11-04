const mongoose = require('mongoose');


const petSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength:10,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    category: {
        type: String,
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId }],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    creator: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
    }
});
module.exports = mongoose.model('Pet', petSchema);


