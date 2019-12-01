const assert = require('assert');
const Reg = require('../models/Registration');
const path = '../models/';
const userReq = require(path + 'User');
const eventReq = require(path + 'Event');
const rideReq = require(path + 'Ride');
const registrationReq = require(path + 'Registration');
const registrationController = require('../controllers/registrationController');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const rideController = require('../controllers/rideController');
const should = require('should');
let mongoose = require('./connection');

// this test requires a user and a user with a ride.
describe('Registration Test', async function() {

      //Create user(passanger) and save to database
      let name01 = 'John Nielsen';
      let username01 = 'JN1944';
      let password01 = 'John1234';
      let user1 = await userController.createUser(name01, username01, password01);

      //create user(driver) and save to DB, then Create a ride associated with this user.
      let name = 'Ride Holdenson';
      let username = 'xRHx';
      let password = 'xxxxxx';
      let user2 = await userController.createUser(name, username, password);

      // create an event to hold a ride.
      let eventName = 'E1';
      let location = 'Here!';
      let date = new Date();
      event = await eventController.createEvent(eventName, location, date);

      //Creating a ride
      let pPoint = 'pick up here!';
      let noOfSeats = 5;
      let id = 123;
      await rideController.createRide(username, pPoint, noOfSeats, event.eventName, id);


      //Creating registration
      registration = await registrationController.createRegistration(5, ride.id, username01);

   before(async function() {
      console.log("Clearing the datamabase!");
      //Clear database before testing!
      await userReq.deleteMany({});
      console.log("Bye users!");
      await eventReq.deleteMany({});
      console.log("Bye events!");
      await rideReq.deleteMany({});
      console.log("Bye rides!");
      await registrationReq.deleteMany({});
      console.log("Bye registrations!");
    });
   });

   it('Creating a registration...', async function() {
      assert(registration.noOfPassengers === 5);
      assert(registration.ride.id === id );
      
     
});