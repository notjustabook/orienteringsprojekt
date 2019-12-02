const mocha = require("mocha");
const moment = require('moment');
const assert = require('assert');
const controller = require('../controllers/controller');

// Describes test
describe('Event test', function () {

    const event = controller.createEvent('Sprint' , 'Track', '2019-12-12');

    it('Test event name', function () {
        assert(event.eventName === 'eventName-test');
    });
    it('Test event location', function () {
        assert(event.location === 'location-test');
    });
    it('Test event date', function () {
        assert(event.date.getFullYear() === 2019);
    })
    it('Test event date', function () {
        assert(event.date.getMonth() === 11);
    })
    it('Test event date', function () {
        assert(event.date.getDate() === 24);
    })
})
