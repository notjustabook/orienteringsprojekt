const mocha = require('mocha');
const assert = require('assert');
const Ride = require('../models/Ride');

//Describes test
describe('Ride test', function() {
    const ride = new Ride({
        pickUpPoint:
            'My house'
    });
    //Creates test
    it('Saves a record to the database', async function() {
        this.timeout(5000);
        await ride.save();
        assert(ride.isNew === false);
    });
});


