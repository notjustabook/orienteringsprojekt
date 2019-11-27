"use strict";

const path = '../models/';
const Ride = require(path + 'Ride');
const eventController = require('./eventController');


exports.createRide = async function(userName, pPoint, numberOfSeats, eventName) {
    const ride = new Ride({
        driver: userName,
        pickUpPoint: pPoint,
        numberOfSeats: numberOfSeats,
    });
    const event = await eventController.getEvent(eventName);
    // here we save a reference to the ride on a given event object.
    // this is not part of Rides tests yet.
    await event.rides.push(ride);
    await event.save();

    await ride.save();
    return ride;
};

exports.getRide = async function(pickUpPoint) {
    return Ride.findOne({pickUpPoint: pickUpPoint}).exec();
};

exports.updateRideComment = async function(ride ,newString){
    foundRide = ride.UpdateOne({pickUpPoint: ride.pickUpPoint}).exec();
    foundRide.comment = newString;

}

exports.getRides = function() {
    return Ride.find().exec;
};