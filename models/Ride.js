const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ride = new Schema({
    driver: String,
    pickUpPoint: String,
    numberOfSeats: Number,
    event: String,
    count: 0
});

module.exports = mongoose.model('Ride', ride);