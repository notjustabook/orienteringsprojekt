const mocha = require('mocha');
const should = require('should');
let path = '../models/';
let user = require(path + 'User');
let controller = require('../controllers/userController');
let mongoose = require('./connection');

describe('User Test', function() {
    this.timeout(5000);
    beforeEach(async function() {
        //Clear database before testing!
        await user.deleteMany({});
    });

    it('Create user', async function() {
        //Create user and save to database
        let name = 'Niels John';
        let userName = '1';
        let password = '2';
        await controller.createUser(name, userName, password);

        //Get user from database
        let testUser = await controller.getUser(userName);
        //Checking if the password matches
        let passwordMatches = await testUser.comparePasswords(password);

        //Verify that data has been saved correctly
        testUser.name.should.be.equal(name);
        testUser.username.should.be.equal(userName);
        passwordMatches.should.be.true();
    });

    /*
    after('Close DB connection', async function() {
        await mongoose.disconnect();
    })
    */
});