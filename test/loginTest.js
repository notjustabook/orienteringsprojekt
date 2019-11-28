const mocha = require('mocha');
const assert = require('assert');
let path = '../models/';
const User = require(path + 'User');
const controller = require('../controllers/userController');
let mongoose = require('./connection');

//Describes test
describe('Login test', function() {
    before(async function() {
        await User.deleteMany({});
        await controller.createUser('nameTest','usernameTest','passwordTest');
    });

    it('Tests with correct information', async function() {
        const login = await controller.login('usernameTest','passwordTest');
        assert(login);
    });

    it('Tests with wrong username', async function() {
        const login = await controller.login('username','passwordTest');
        assert(login ==='Incorrect username');
    });

    it('Tests with wrong password',async function() {
        this.timeout(5000);
        const login = await controller.login('usernameTest','123');
        assert(login === 'Incorrect password');
    });

    after('Close DB connection', async function() {
        await mongoose.disconnect();
    })
});