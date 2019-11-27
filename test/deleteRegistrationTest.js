const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/User');
const Registration = require('../models/registration');
const controller = require('../controllers/controller');


//Describes test
describe('Delete registration', async function() {
    controller.createUser('testName','testUsername','testPassword');
    controller.createRide('westOfTest',4);
        await controller.createRegistration('westOfTest','testUsername',1);
    const registration = await controller.getRegistration('testUsername','westOfTest');
    console.log(registration);
    it('Tests if registration exists', async function () {
    assert(registration);
    });

    it('Tests if registration gets deleted', async function () {
        await controller.deleteRegistration('testUsername','westOfTest');
        assert(Registration.findOne('testUsername'));
    });
});