"use strict";

const path = '../models/';
const Registration = require(path + 'Registration');
const Ride = require(path + 'Ride');

exports.createRegistration = async function(numberOfPassengers, rideId, passengerUsername){
    let registration = new Registration({
        numberOfPassengers: numberOfPassengers,
        ride: rideId,
        rideTaker: passengerUsername,
    });
    return registration.save();
};

exports.deleteRegistration = async function(username,rideId){
    const ride = await Ride.findOne({rideId});
    const registration = await Registration.findOne({username});
    ride.numberOfSeats += registration.numberOfPassengers;
    await Registration.deleteOne(registration);
};

exports.getRegistration = function(){
    return Registration.find().exec;
};