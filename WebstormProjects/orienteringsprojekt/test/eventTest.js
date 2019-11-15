const assert = require('chai').assert;
const event = require('../controllers/controller');

describe('Event', function() {
    it('Test event should be created', function (){
        assert.equal(controller.getEvent, {eventName: 'Test', location: 'Test', date: ('January 1', 2000)});
    })
})