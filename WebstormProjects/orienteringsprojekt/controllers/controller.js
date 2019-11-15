"use strict";

let path = '../models/';
let Event = require(path + 'Event');

exports.createEvent = function (eventName, location, date) {
    const event = new Event({
        eventName,
        location,
        date
    });
    return event.save();
};
