const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const registration = new Schema({

    noOfPassengers: Number,
    ride: {
        type: ObjectId,
        pickUpPoint: String,
        ref: 'Ride'
    },

    rideTaker: {
        type: ObjectId,
        username: String,
        ref: 'User'
     }
});

module.exports = mongoose.model('Registration', registration);