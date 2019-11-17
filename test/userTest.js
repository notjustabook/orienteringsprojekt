const mocha = require('mocha');
const should = require('should');
let path = '../models/';
let user = require(path + 'User');
let controller = require('../controllers/controller');

describe('unitTest', () => {
    it('Create user', async function() {
        //Create user and save to database
        let name = 'Jimmy John';
        let userName = 'JJ2020';
        let password = 'jim1234';
        await controller.createUser(name, userName, password);

        //Get user from database
        let testUser = await controller.getUser('JJ2020');

        //Verify that data has been saved correctly
        testUser.name.should.be.equal(name);
        testUser.userName.should.be.equal(userName);
        testUser.userName.should.be.equal(password);

        //Clean up database afterwards
        await user.deleteOne({userName: userName});
    });

});