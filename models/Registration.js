const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const registration = new Schema({
    noOfPassengers: Number,
    rideId: Number,
    passenger: String
});

module.exports = mongoose.model('Registration', registration);