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


// this test requires a user and a user with a ride.
describe('Registration Test', function() {

   before(async function() {
      console.log("Clearing the database!");
      //Clear database before testing!
      await userReq.deleteMany({});
      await eventReq.deleteMany({});
      await rideReq.deleteMany({});
      await registrationReq.deleteMany({});
    
   //Create user(passanger) and save to database
   passenger = await userController.createUser('John Nielsen', 'JN1944', 'John1234');
  
   //create user(driver) and save to DB, then Create a ride associated with this user.
   driver = await userController.createUser('Ride Holdenson','xRHx' , 'xxxxxx');
 
   // create an event to hold a ride.
   event = await eventController.createEvent('E1', 'Here!', new Date());
  
   //Creating a ride
   ride = await rideController.createRide(driver.username, 'pick up here!', 5, event.eventName);
   console.log(ride)

   console.log("Creating Registration")
   registration = await registrationController.createRegistration(5, ride.id, passenger.username);
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
     
});
  

  