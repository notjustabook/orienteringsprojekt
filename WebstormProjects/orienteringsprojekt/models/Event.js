const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema({
    eventName: String,
    location: String,
    date: Date,
});

module.exports = mongoose.model('Event', event);