const mocha = require("mocha");
const assert = require('assert');
const controller = require('../controllers/controller');

// Describes test
describe('Event test', function () {

    const event = controller.createEvent('eventName-test' , 'location-test', 1, 1, 2000);

    it('Test event name', async function () {
        assert(event.eventName === 'eventName-test');
    });
    it('Test event location', async function () {
        assert(event.location === 'location-test');
    });
    it('Test event date', async function () {
        assert(event.date === (1, 1, 2000));
    })
})
