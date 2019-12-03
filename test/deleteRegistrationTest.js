const mocha = require('mocha');
const moment = require('moment');
const assert = require('assert');
const User = require('../models/User');
const Registration = require('../models/Registration');
const eventController = require('../controllers/eventController');
const registrationController = require('../controllers/registrationController');
const rideController = require('../controllers/rideController');
const userController = require('../controllers/userController');
let mongoose = require('./connection');

//Describes test
describe('Delete registration', function() {
    let registration = null;
    let ride = null;
        before(async function() {
        await eventController.createEvent('testEvent','testLocation',moment('2012-01-01'));
        await userController.createUser('testName','testUsername','testPassword');
        await userController.createUser('testPassenger','testPassengerUsername','testPassengerPassword');
        ride = await rideController.createRide('testUsername','westOfTest',4,'testEvent');
        registration = await registrationController.createRegistration(2,ride.rideId,'testPassengerUsername');
    });
    it('Tests if registration exists', async function () {
        this.timeout(5000);
        assert(registration);
    });

    it('Tests if registration gets deleted', async function () {
        this.timeout(5000);
        let reg = await registrationController.getRegistration('testPassengerUsername',ride.rideId);
        console.log(reg);
        await registrationController.deleteRegistration('testPassengerUsername',);
        reg = await registrationController.getRegistration('testPassengerUsername',ride.rideId);
        console.log(reg);
        assert(reg === null);
    });
    /*
    after('Close DB connection', async function() {
        await mongoose.disconnect();
    })
    */
});