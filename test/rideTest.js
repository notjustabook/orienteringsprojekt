const mocha = require('mocha');
const assert = require('assert');

const controller = require('../controllers/controller');

//Describes test
describe('Ride test', function() {

    const ride = controller.createRide('driverTest', 'pickUpPointTest', 5, 'eventTest');

    //Creates test
    it('Checks event attribute', function(){
        assert(ride.event === 'eventTest');
    });

    it('Checks pickUpPoint attribute', function(){
        assert(ride.pickUpPoint === 'pickUpPointTest');
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
        let record = await controller.getRide('pickUpPointTest');
        assert(record.pickUpPoint === 'pickUpPointTest');
    });
});
