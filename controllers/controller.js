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

exports.createUser = function (name, userName, password) {
        const user = new User({
            name: name,
            userName: userName,
            password: password
        });
        user.save();
        return user;
};

exports.getUser = function(userName) {
    return User.findOne({userName: userName}).exec();

};



exports.login = async function(username,password) {
    const user = await User.findOne({userName: username}).exec();
    if(user == null)
        return 'Incorrect username';
    if(!await user.comparePasswords(password))
        return 'Incorrect password';
    return await user.comparePasswords(password);
};

exports.createRide = function(userName, pPoint, numberOfSeats, eName) {
    const ride = new Ride({
        driver: userName,
        pickUpPoint: pPoint,
        numberOfSeats: numberOfSeats,
        count: 0,
    
    });
    const event =  this.getEvent(eName);
    console.log(event);
    // here we save a reference to the ride on a given event object.
    // this is not part of Rides tests yet.
    event.registrations.push(ride);
    event.findOneAndUpdate({eventName: eName}).exec();

    ride.save();
    return ride;
};

exports.getRide = async function(pickUpPoint) {
    const ride = await Ride.findOne({pickUpPoint: pickUpPoint}).exec();
    return ride;
};

exports.getRides = function() {
    return Ride.find().exec;
};

exports.createRegistration =  function(pickUpPoint, rideTakerUserName, numberOfPassengers ){

    const _rideTaker =  this.getUser(rideTakerUserName);
    const _ride =  this.getRide(pickUpPoint);
  

    let registration = new Registration({
        numberOfPassengers: numberOfPassengers,
        ride: _ride,
        rideTaker: _rideTaker,
    });
    console.log(registration);
    // her skal der nok laves noget validation inden de forskellige objekter pushes på arrays.
    // rideTaker.registrations.
    console.log(_ride);
    _ride.registrations.push(registration);
    registration.save();
    rideTaker.save();
    ride.save();
    return registration;
};

exports.getRegistration = function(){
    return Registration.find().exec;
}


