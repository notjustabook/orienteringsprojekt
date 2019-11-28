"use strict";

let path = '../models/';
let Ride = require(path + 'Ride');
const eventController = require('./eventController');
const userController = require('./userController');
const registrationController = require('./registrationController');

exports.createRide = async function(userName, pPoint, numberOfSeats, eName,rideId) {
    const ride = new Ride({
        driver: userName,
        pickUpPoint: pPoint,
        numberOfSeats: numberOfSeats,
        rideId: rideId,
    });
    const event = await eventController.getEvent(eName);
    console.log("Here is the event:");
    console.log(event);

    // Saves a reference to the ride on a given event object.
    // Not part of Rides tests yet.
    if(event.rides === undefined)
    {
        event.rides = [];
    }
    await event.rides.push(pPoint);
    await event.save();

    await ride.save();
    return ride;
};
// generer random id, skal lige tænkes over (simon)
    function generateID(){

}
exports.getRide = async function(pickUpPoint) {
    return Ride.findOne({pickUpPoint: pickUpPoint}).exec();
};

exports.getRides = function() {
    return Ride.find().exec;
};

exports.deleteRide = async function(id) {
    let ride = await getRide(id);
    let user = await userController.getUser(ride.driver);
    let events = await eventController.getEvents();
    let registrations = await registrationController.getRegistrations();

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