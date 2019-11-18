const mocha = require("mocha");
const Event = require('../models/Event');
// Describes test
describe('Event test', async function () {
    const event = await Event.findOne({
        eventName: 'eventName-test',
        location: 'location-test',
        date: ('January 1', 2000)
    });
    it('Test event name', async function () {
        assert(event.eventName === 'eventName-test');
    });
    it('Test event location', async function () {
        assert(event.location === 'location-test');
    });
    it('Test event date', async function () {
        assert(event.date === ('January 1', 2000));
    })
})
