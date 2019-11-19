const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/User');
const controller = require('../controllers/controller');


//Describes test
describe('Login test', function() {
    controller.createUser('nameTest','usernameTest','passwordTest');

    it('Tests with correct information', async function() {
        this.timeout(5000);
        const login = controller.login('usernameTest','passwordTest');
        assert(login);
    });

    it('Tests with wrong username', async function() {
        this.timeout(5000);
        const login = await controller.login('username','passwordTest');
        assert(login ==='Incorrect username');
    });

    it('Tests with wrong password',async function() {
        this.timeout(5000);
        const login = await controller.login('usernameTest','123');
        assert(login === 'Incorrect password');
    });
});