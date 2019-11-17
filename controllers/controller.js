"use strict";

let path = '../models/';
let Event = require(path + 'Event');
let User = require(path + 'User');

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
    const user = new User({
        name: name,
        userName: userName,
        password: password,
        salt: 'salty'
    });
    return user.save();
};

exports.getUser = function(userName) {
    return User.findOne({userName: userName}).exec();
};