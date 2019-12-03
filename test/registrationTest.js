const should = require('should');
const path = '../models';
const userReq = require(path + '/User');
const eventReq = require(path + '/Event');
const rideReq = require(path + '/Ride');
const registrationReq = require(path + '/Registration');
const registrationController = require('../controllers/registrationController');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const rideController = require('../controllers/rideController');
let mongoose = require('./connection');

let registration = null;
let passenger = null;
let driver = null;
let ride = null;
let event = null;

// this test requires a user and a user with a ride.
describe('Registration Test', function() {

   before(async function() {

      //Clear database before testing!
      await userReq.deleteMany({});
      await eventReq.deleteMany({});
      await rideReq.deleteMany({});
      await registrationReq.deleteMany({});
      console.log("DataBase Cleared!");

   //Create user(passanger) and save to database
   passenger = await userController.createUser('John Nielsen', 'JN1944', 'John1234');
   //create user(driver) and save to DB, then Create a ride associated with this user.

   // create an event to hold a ride.
   event = await eventController.createEvent('E1', 'Here!', new Date());
   //Creating a ride
   ride = await rideController.createRide(driver.username, 'pick up here!', 5, event.eventName);
   console.log(ride);


   console.log("Creating Registration");
   registration = await registrationController.createRegistration(5, ride.id, passenger.username);
   // mangler stadig ID fra Ride af.
   console.log(registration);
   });

   it('Number of Passengers test',  function() {
      registration.should.have.property('noOfPassengers').which.is.a.Number();
   });

   it('Ride ID test', function() {
     registration.ride.should.be.a.String();
   });

   it('Passenger test', function() {
     registration.passenger.should.be.a.String();
   });
   it('Tests if registration gets deleted', async function () {
      this.timeout(5000);
      await registrationController.deleteRegistration('JN1944',ride.id);
      const reg = await registrationController.getRegistration('testPassengerUsername',ride.rideId);
      assert(reg === null);
   });

   /*
    after('Close DB connection', async function() {
        await mongoose.disconnect();
    })
    */

});
  

  