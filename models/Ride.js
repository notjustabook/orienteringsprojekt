const mongoose = require('mongoose');

const rideSchema = mongoose.Schema;
const ride = new rideSchema({
    driver: String,
    pickUpPoint: String,
    numberOfSeats: Number,
    count: 0,
    registrations: [{type: Object, ref: 'Registration'}],
});

module.exports = mongoose.model('Ride', ride);