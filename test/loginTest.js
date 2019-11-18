const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/User');
const controller = require('../controllers/controller');


//Describes test
describe('Login test', function() {
    const user = controller.createUser('nameTest','usernameTest','passwordTest');
    it('Tests with correct information', async function() {
        assert(controller.login('usernameTest','passwordTest'));
    });
    it('Tests with wrong username', async function() {
        assert(!controller.login('username','passwordTest'));
    });
    it('Tests with correct information', async function() {
        assert(!controller.login('usernameTest','123'));
    });
});