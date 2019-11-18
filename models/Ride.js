const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ride = new Schema({
    pickUpPoint: String,
    numberOfPassengers: Number,
    count: 0
});

module.exports = mongoose.model('Ride', ride);