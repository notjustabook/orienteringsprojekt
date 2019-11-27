const mocha = require("mocha");
const moment = require('moment');
const assert = require('assert');
const controller = require('../controllers/eventController');

// Describes test
describe('Event test', function () {

    const event = controller.createEvent('eventName-test' , 'location-test', moment('2012-01-01'));

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
        assert(event.date.getDate() === 1);
    })
});
