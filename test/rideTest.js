const mocha = require('mocha');
const assert = require('assert');
const rideController = require('../controllers/rideController');
const eventController = require('../controllers/eventController');
let mongoose = require('./connection');

//Describes test
describe('Ride test', function() {
    this.timeout(5000);

    let ride = null;
    before(async function() {
        event = await eventController.createEvent("RideTest Event", 'RideTest Location', new Date());
        ride = await rideController.createRide('driverTest', 'test', 5, event.eventName);
    });

    //Creates test
    it('Checks id attribute', function(){
        assert(ride._id !== null);
        
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
        let record = await rideController.getRide(ride._id);
        console.log(record);
        console.log(ride);
        assert(record === ride);
    });

    it('Deletes a record from the database', async function() {
        await rideController.deleteRide(ride._id);
        let record = await rideController.getRide(ride._id);
        assert(record === null);
    });

    /*
    after('Close DB connection', async function() {
        await mongoose.disconnect();
    })
    */
});


