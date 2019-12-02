"use strict";

let path = '../models/';
let Registration = require(path + 'Registration');

exports.createRegistration = async function(numberOfPassengers, rideId, passengerUsername){
    let registration = new Registration({
        noOfPassengers: numberOfPassengers,
        ride: rideId,
        passenger: passengerUsername,
    });
    return registration.save();
};

exports.getRegistrations = function(){
    return Registration.find().exec;
};