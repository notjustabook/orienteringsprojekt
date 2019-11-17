const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/User');
const hash = require('../');

//Describes test
describe('Login test', function() {
    it('Finds a user from the database', async function() {
        const user = await User.findOne({userName: 'username-test'});
        assert(user.userName === 'username-test');
    });
    it('Finds a user from the database', async function() {
        const user = await User.findOne({userName: 'username-test'});
        const password = user.pass;
        const salt = user.salt;
        assert(password === hash('password-test' + salt));
    });
});