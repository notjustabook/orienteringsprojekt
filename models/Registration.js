const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registration = new Schema({
    noOfSeats: Number,
    user: Object,
    ride: Object
});

module.exports = mongoose.model('Registration', registration);