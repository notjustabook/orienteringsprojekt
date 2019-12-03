const mocha = require("mocha");
const moment = require('moment');
const assert = require('assert');
const controller = require('../controllers/eventController');
let mongoose = require('./connection');

// Describes test
describe('Event test', function () {

    let event = null;

    before(async function() {
        testDate =  new date();
        event = await controller.createEvent('eventName-test' , 'location-test', testDate);
    });

    it('Test event name', function () {
        assert(event.eventName === 'eventName-test');
    });
    it('Test event location', function () {
        assert(event.location === 'location-test');
    });
    it('Test event date', function () {
        assert(event.date.getFullYear() === 2012);
    });
    it('Test event date', function () {
        assert(event.date.getMonth() === 0);
    });

    it('Test event date', function () {
        console.log(event.date);
        assert(event.date === testDate);
    });
    /*
    after('Close DB connection', async function() {
        await mongoose.disconnect();
    });
    */
});
