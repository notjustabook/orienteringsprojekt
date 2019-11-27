const mongoose = require('mongoose');
let path = '../models/';
let Ride = require(path + 'Ride');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const event = new Schema({
    eventName: String,
    location: String,
    date: Date,
    rides: [{ type: Object, ref: 'Ride'}],
});

module.exports = mongoose.model('Event', event);