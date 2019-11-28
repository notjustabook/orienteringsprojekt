

const mocha = require('mocha');
const moment = require('moment');
const assert = require('assert');
const User = require('../models/User');
const Registration = require('../models/Registration');
const eventController = require('../controllers/eventController');
const registrationController = require('../controllers/registrationController');
const rideController = require('../controllers/rideController');
const userController = require('../controllers/userController');

//Describes test
describe('Delete registration', function() {
        eventController.createEvent('testEvent','testLocation',moment('2012-01-01'));
        userController.createUser('testName','testUsername','testPassword');
        userController.createUser('testPassenger','testPassengerUsername','testPassengerPassword');
        rideController.createRide('testUsername','westOfTest',4,'testEvent',123);
        registrationController.createRegistration(2,123,'testPassengerUsername');
    it('Tests if registration exists', async function () {
        this.timeout(5000);
        const reg = await Registration.findOne({rideId:123,passenger:'testPassengerUsername'});
        assert(reg);
    });

    it('Tests if registration gets deleted', async function () {
        this.timeout(5000);
        await registrationController.deleteRegistration('testPassengerUsername',123);
        const reg = await Registration.findOne({rideId:123,passenger:'testPassengerUsername'});
        assert(reg === null);
    });
});