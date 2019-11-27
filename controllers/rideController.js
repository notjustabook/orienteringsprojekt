"use strict";

let path = '../models/';
let Ride = require(path + 'Ride');
let eventController = require('./eventController');

exports.createRide = async function(userName, pPoint, numberOfSeats, eName) {
    const ride = new Ride({
        driver: userName,
        pickUpPoint: pPoint,
        numberOfSeats: numberOfSeats,
        count: 0,
    });
    const event = await eventController.getEvent(eName);
    console.log("Here is the event:");
    console.log(event);
    // here we save a reference to the ride on a given event object.
    // this is not part of Rides tests yet.
    await event.rides.push(ride);
    await event.save();
    return ride.save();
};

exports.getRide = async function(pickUpPoint) {
    return Ride.findOne({pickUpPoint: pickUpPoint}).exec();
};

exports.getRides = function() {
    return Ride.find().exec;
};