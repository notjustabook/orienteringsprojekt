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

exports.createUser = function(name, userName, password) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User({
            name: name,
            userName: userName,
            password: hash,
        });
        return user.save();
    });
};

exports.getUser = function(userName) {
    console.log(User.findOne({userName: userName}).exec());
};
exports.login = function(username,password) {
    const user = getUser(username);
    console.log(user);
    if(!user)
        return user;
    bcrypt.compare(password, user.password, function (err, result) {
       return result;
    });
};