const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date, default: Date.now
    },
    tokens: {
        type: String,
    }
});


const User = mongoose.model('User', UserSchema);
User.createIndexes();
module.exports = User;