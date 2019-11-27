const mocha = require('mocha');
const assert = require('assert');

const controller = require('../controllers/eventController');

//Describes test
describe('Ride test', function() {
    const ride = controller.createRide(123,'driverTest', 'test', 5);

    //Creates test
    it('Checks id attribute', function(){
        assert(ride.id === 123);
    });
    it('Checks pickUpPoint attribute', function(){
        assert(ride.pickUpPoint === 'test');
    });

    it('Checks driver attribute', function(){
        assert(ride.driver === 'driverTest');
    });

    it('Checks numberOfPassengers attribute', function(){
        assert(ride.numberOfSeats === 5);
    });

    it('Saves a record to the database', async function() {
        this.timeout(5000);
        assert(ride.isNew === false);
    });

    it('Finds a record from the database', async function() {
        this.timeout(5000);
        let record = await controller.getRide(123);
        assert(record.id === 123);
    });

    it('Deletes a record from the database', async function() {
        await controller.deleteRide('test');
        let record = await controller.getRide(123);
        assert(record === null);
    });
});


