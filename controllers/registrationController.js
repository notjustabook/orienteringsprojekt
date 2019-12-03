"use strict";

const path = '../models/';
const Registration = require(path + 'Registration');
const rideController = require('./rideController');
const Ride = require(path + 'Ride');

exports.createRegistration = async function(numberOfPassengers, rideId, passengerUsername){
    let registration = new Registration({
        noOfPassengers: numberOfPassengers,
        ride: rideId,
        passenger: passengerUsername,
    });
    return registration.save();
};

exports.deleteRegistration = async function(username,rideId){
    const ride = await rideController.getRide(rideId);
    const registration = await this.getRegistration(username,rideId);
    ride.numberOfSeats += registration.noOfPassengers;
    await Registration.deleteOne(registration);
};

exports.getRegistrations = function(){
    return Registration.find();
};

exports.getRegistration = async function(username,rideId){
    let registration = null;
    for(let e of await this.getRegistrations()){
        if(e.passenger === username && e.rideId === rideId)
            registration = e;
    }
    return registration;
};

exports.getRegistration = function(){
    return registration.findOne({ride: ride}).exec;
};