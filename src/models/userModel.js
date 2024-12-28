const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Hash password before saving

const UserModel = mongoose.model('User', userSchema);




module.exports = UserModel;


