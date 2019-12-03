"use strict";

const path = '../models/';
const Registration = require(path + 'Registration');
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
    const ride = await Ride.findOne({rideId});
    const registration = await Registration.findOne({username});
    ride.numberOfSeats += registration.noOfPassengers;
    await Registration.deleteOne(registration);
};

exports.getRegistrations = function(){
    return Registration.find().exec;
};

exports.getRegistration = function(){
    return registration.findOne({ride: ride}).exec;
};