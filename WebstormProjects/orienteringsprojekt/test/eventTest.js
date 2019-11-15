const assert = require('chai').assert;
const mocha = require("mocha");
const controller = require('../controllers/controller');


describe('Event', function() {
    it('Test event should be created', function (){
        assert.equal(controller.getEvents, {eventName: 'Test', location: 'Test', date: ('January 1', 2000)});
    })
})