const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/User');
const Registration = require('../models/registration');
const controller = require('../controllers/controller');


//Describes test
describe('Delete registration', function() {
    controller.createUser('testName','testUsername','testPassword');
    const user = controller.getUser('testUsername');
    controller.createRide('westOfTest',4);
    const ride = controller.getRide('westOfTest');
        controller.createRegistration(user,ride);
    const registration = controller.getRegistration(user,ride);
    it('Tests if registration exists', function () {
    assert(registration);
    });

    it('Tests if registration gets deleted', function () {
        controller.deleteRegistration(user,ride);
        assert(registration === null);
    });
});