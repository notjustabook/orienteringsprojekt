const mongoose = require('mongoose');
let path = '../models/';
let Registration = require(path + 'Registration');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ride = new Schema({
    id: Number,
    driver: String,
    pickUpPoint: String,
    numberOfSeats: Number,
    count: 0,
    /*registrations: [{
        type: ObjectId, 
        ref: 'Registration'
    }],*/
});

module.exports = mongoose.model('Ride', ride);