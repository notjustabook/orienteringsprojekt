"use strict";

let path = '../models/';
let Event = require(path + 'Event');
let User = require(path + 'User');
let Ride = require(path + 'Ride');
let Registration = require(path + 'Registration');
let bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createEvent = function (eventName, location, date) {
    const event = new Event({
        eventName: eventName,
        location: location,
        date: date
    });
    event.save();
    return event;
};

exports.getEvents = function() {
    return Event.find().exec();
};

exports.getEvent = function(eventName) {
    return Event.findOne({'eventName': eventName}).exec();
};

exports.createUser = function (name, userName, password) {
        const user = new User({
            name: name,
            userName: userName,
            password: password,
        });
        user.save();
        return user;
};

exports.getUser = function(userName) {
    return User.findOne({'userName': userName}).exec();

};

exports.createRegistration = function(){

};

exports.login = async function(username,password) {
    const user = await User.findOne({userName: username}).exec();
    if(user == null)
        return 'Incorrect username';
    if(!await user.comparePasswords(password))
        return 'Incorrect password';
    return await user.comparePasswords(password);
};

exports.createRide = function(pickUpPoint, numberOfPassengers) {
    const ride = new Ride({
        pickUpPoint: pickUpPoint,
        numberOfPassengers: numberOfPassengers,
        count: 0
    });
    ride.save();
    return ride;
};

exports.getRide = async function(pickUpPoint) {
    return await Ride.findOne({pickUpPoint: pickUpPoint}).exec();
};

exports.getRides = function() {
    return Ride.find().exec;
};

exports.getRegistration = function(){
    return Registration.find().exec;
}

