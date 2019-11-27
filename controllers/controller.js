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

exports.createRide = async function(id, userName, pPoint, numberOfSeats, eName) {
    const ride = new Ride({
        id: id,
        driver: userName,
        pickUpPoint: pPoint,
        numberOfSeats: numberOfSeats,
    });
    const event = await this.getEvent(eName);
    console.log("Here is the event:");
    console.log(event);
    // here we save a reference to the ride on a given event object.
    // this is not part of Rides tests yet.
    if(event.rides === undefined)
    {
        event.rides = [];
    }
    await event.rides.push(ride._id);
    await event.save();

    await ride.save();
    return ride;
};

exports.getRide = async function(id) {
    return Ride.findOne({id: id}).exec();
};

exports.getRides = function() {
    return Ride.find().exec;
};

exports.deleteRide = async function(id) {
    let ride = await getRide(id);
    let user = await getUser(ride.driver);
    let events = await getEvents();
    let registrations = await getRegistrations();

    // Finds the event
    for (let i = 0; i < events.length; i++) {
        // Finds the ride
        for (let j = 0; j < events[i].rides.length; j++) {
            // Finds the ID and deletes the ride from array
            if (events[i].rides[j].id === id)
                events[i].rides.splice(j,1);
        }
    }

    // Deletes the ride from the user's array of rides
    for (let i = 0; i < user.rides.length; i++) {
        if (user.rides[i].id === id)
            user.rides.splice(i,1);
    }

    // Deletes the ride from the registrations
    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].ride.id === id)
            Registration.deleteOne(registrations[i]);
    }

    // Deletes the ride
    Ride.deleteOne({id: id});
};

exports.createRegistration = async function(pickUpPoint, rideTakerUserName, numberOfPassengers ){

    const _rideTaker = await this.getUser(rideTakerUserName);
    const _ride = await this.getRide(pickUpPoint);

    let registration = new Registration({
        numberOfPassengers: numberOfPassengers,
        ride: _ride,
        rideTaker: _rideTaker.id,
    });
    console.log(registration);
    // her skal der nok laves noget validation inden de forskellige objekter pushes på arrays.
    // rideTaker.registrations.
    console.log(_ride);
    //_ride.registrations.push(registration);
    registration.save();
    //rideTaker.save();
    //ride.save();
    return registration;
};

exports.getRegistration = function(){
    return Registration.find().exec;
};


