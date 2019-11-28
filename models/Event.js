const mongoose = require('mongoose');
let path = '../models/';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const event = new Schema({
    eventName: String,
    location: String,
    date: Date,
    rides: [{id: Number}]
});

module.exports = mongoose.model('Event', event);