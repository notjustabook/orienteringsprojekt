"use strict";

let path = '../models/';
let Event = require(path + 'Event');
let User = require(path + 'User');
let bcrypt = require('bcrypt');
const saltRounds = 10;

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

exports.createUser = function (name, userName, password) {
    return bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User({
            name: name,
            userName: userName,
            password: hash,
        });
        return user.save();
    });
};

exports.getUser = function(userName) {
    return User.findOne({userName: userName}).exec();
};
exports.login = function(username,password) {
    const user = getUser(username);
    if(user)
    return user.password === Hash(password + user.salt);
};