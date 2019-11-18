const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    userName: String,
    password: String,
});

module.exports = mongoose.model('User', user);