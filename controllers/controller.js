"use strict";

let path = '../models/';
let Event = require(path + 'Event');
let User = require(path + 'User');
let Ride = require(path + 'Ride');
let Registration = require(path + 'Registration');

exports.createEvent = function (eventName, location, date) {
    const event = new Event({
        eventName: eventName,
        location: location,
        date: date,
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

exports.createUser = function (name, username, password) {
    if (password === '') {
        throw "Password skal udfyldes.";
    }
    const user = new User({
        name: name,
        username: username,
        password: password,
    });
    return user.save();
};

exports.getUser = function(username) {
    return User.findOne({'username': username}).exec();
};



exports.login = async function(username,password) {
    const user = await User.findOne({userName: username}).exec();
    if(user == null)
        return 'Incorrect username';
    if(!await user.comparePasswords(password))
        return 'Incorrect password';
    return await user.comparePasswords(password);
};

exports.createRide = async function(userName, pPoint, numberOfSeats, eName) {
    const ride = new Ride({
        driver: userName,
        pickUpPoint: pPoint,
        numberOfSeats: numberOfSeats,
    });
    const event = await this.getEvent(eName);
    console.log("Here is the event:");
    console.log(event);
    // here we save a reference to the ride on a given event object.
    // this is not part of Rides tests yet.
    await event.rides.push(ride._id);
    await event.save();
    await ride.save();
    return ride;
};

exports.getRide = async function(pickUpPoint) {
    return Ride.findOne({pickUpPoint: pickUpPoint}).exec();
};

exports.getRides = function() {
    return Ride.find().exec;
};

exports.createRegistration = async function(ride, passanger, numberOfPassengers ){


    let registration = new Registration({
        numberOfPassengers: numberOfPassengers,
        ride: ride.id,
        passanger: passanger.username,
    });

    registration.save();
    return registration;
};

exports.getRegistrations = function(){
    return Registration.find().exec;
};


