const mocha = require('mocha');
const assert = require('assert');
const Ride = require('../models/Ride');
const controller = require('../controllers/controller');

//Describes test
describe('Ride test', function() {

    const ride = controller.createRide('test', 5);

    //Creates test
    it('Checks pickUpPoint attribute', function(){
        assert(ride.pickUpPoint === 'test');
    });

    it('Checks numberOfPassengers attribute', function(){
        assert(ride.numberOfPassengers === 5);
    });

    it('Saves a record to the database', async function() {
        this.timeout(5000);
        assert(ride.isNew === false);
    });

    it('Finds a record from the database', async function() {
        this.timeout(5000);
        let record = await controller.getRide('test');
        assert(record.pickUpPoint === 'test');
    });
});


