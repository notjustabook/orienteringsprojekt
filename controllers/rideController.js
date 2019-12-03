"use strict";

let path = '../models/';
let Ride = require(path + 'Ride');
let Registration = require(path + 'Registration');
const eventController = require('./eventController');
const userController = require('./userController');
const registrationController = require('./registrationController');

exports.createRide = async function(userName, pPoint, numberOfSeats, eName) {
    const ride = new Ride({
        driver: userName,
        pickUpPoint: pPoint,
        numberOfSeats: numberOfSeats,
    });
    const event = await eventController.getEvent(eName);
    // here we save a reference to the ride on a given event object.
    // this is not part of Rides tests yet.

    await event.rides.push(ride.id);
    await event.save();
    return ride.save();
};

exports.getRide = async function(id) {
    return Ride.findOne({_id: id}).exec();
};

exports.updateRideComment = async function(ride ,newString){
    let foundRide = Ride.updateOne({pickUpPoint: ride.pickUpPoint}).exec();
    foundRide.comment = newString;

};

exports.getRides = function() {
    return Ride.find().exec();
};

exports.deleteRide = async function(idToDelete) {
    let ride = await this.getRide(idToDelete);
    let user = await userController.getUser(ride.driver);
    let events = await eventController.getEvents();
    let registrations = await registrationController.getRegistrations();

    // Finds the event
    for (let i = 0; i < events.length; i++) {
        // Finds the ride
        for (let j = 0; j < events[i].rides.length; j++) {
            // Finds the ID and deletes the ride from events array
            if (events[i].rides[j]._id === idToDelete)
                events[i].rides.splice(j,1);
        }
    }

    // Deletes the ride from the user's array of rides
    for (let i = 0; i < user.rides.length; i++) {
        if (user.rides[i].id === idToDelete)
            user.rides.splice(i,1);
    }

    // Deletes the ride from the registrations
    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].rideId === idToDelete)
            Registration.deleteOne(registrations[i]);
    }

    // Deletes the ride
    Ride.deleteOne({_id: idToDelete});
};