const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const registration = new Schema({

    noOfPassangers: Number,
    ride: {
        type: ObjectId,
        ref: 'Ride'
    },
    rideTaker: {
        type: ObjectId,
        ref: 'User'
     }
});

module.exports = mongoose.model('Registration', registration);