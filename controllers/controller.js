"use strict";

let path = '../models/';
let Event = require(path + 'Event');

exports.createEvent = function (eventName, location, date) {
    const event = new Event({
        eventName: eventName,
        location: location,
        date: date
    });
    return event.save();
};

exports.getEvents = function() {
    return Event.find().exec();
};

exports.createUser = function(name, userName, password) {

};

exports.getUser = function(userName) {

};