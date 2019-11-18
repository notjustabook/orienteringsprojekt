const expect = require('chai').expect;
const Reg = require('../models/Registration');
const user = require('../models/User');
const ride = require('../models/Ride');

Describe('Registration', async () => {
    const ride01 = new ride();
    const user01 = new user();
    const Result = new Registration(1, user01, ride01 )
    it('noOfSeats should be a whole number', () => {
        expect(result.getNoOfSeats).to.be.a('number');
        expect(result.getNoOfSeats).to.be.above(0);
        // tester om det er et heltal(whole number).
        expect(reuslt.getNoOfSeats % 1).to.equal(0);
    })

    it('Should have user and ride property, and they may not be null', async () => {
        expect(result).to.have.keys(['ride', 'user']);
        expect(result.getUser).to.not.be.null;
        expect(result.getRide).to.not.be.null;
    })
});