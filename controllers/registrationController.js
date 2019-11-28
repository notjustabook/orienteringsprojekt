"use strict";

let path = '../models/';
let Registration = require(path + 'Registration');

exports.createRegistration = async function(numberOfPassengers, rideId, passengerUsername){
    let registration = new Registration({
        numberOfPassengers: numberOfPassengers,
        ride: rideId,
        rideTaker: passengerUsername,
    });
    return registration.save();
};

exports.getRegistration = function(){
    return Registration.find().exec;
};