"use strict";

let path = '../models/';
let Event = require(path + 'Event');
let Ride = require(path + 'Ride');
// EVENT UNDER HERE!
exports.createEvent = function (eventName, location, date) {
    const event = new Event({
        eventName: eventName,
        location: location,
        date: date
    });
    return event.save();
};

exports.getEvents = async function() {
    return Event.find().exec();
};


// RIDE UNDER HERE!
exports.createRide = function(pickUpPoint, numberOfPassengers) {
    const ride = new Ride({
        pickUpPoint: pickUpPoint,
        numberOfPassengers: numberOfPassengers,
        count: 0
    });
    ride.save();
    return ride;
}

exports.deleteRide = function() {

}

exports.getRides = function() {
    return Ride.find.exec();
}

exports.getRide = function(pickUpPoint) {
    return Ride.findOne({pickUpPoint: pickUpPoint});
}
