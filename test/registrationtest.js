const assert = require('assert');
const Reg = require('../models/Registration');
const userReq = require('../models/User');
const eventReg = require('../models/Event');
const rideReg = require('../models/Ride');
const registrationController = require('../controllers/registrationController');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const rideController = require('../controllers/rideController');
const should = require('should');
let mongoose = require('./connection');

// this test requires a user and a user with a ride.
describe('Registration Test', function() {
   it('Create Registration', async function() {
      //Create user and save to database
      let name01 = 'John Nielsen';
      let username01 = 'JN1944';
      let password01 = 'John1234';
      let user1 = await userController.createUser(name01, username01, password01);

      //create user and save to DB, then Create a ride associated with this user.
      let name = 'Ride Holdenson';
      let username = 'xRHx';
      let password = 'xxxxxx';
      let user2 = await userController.createUser(name, username, password);

      // create an event to hold a ride.
      let eventName = 'E1';
      let location = 'Here!';
      let date = new Date();
      let event = await eventController.createEvent(eventName, location, date);

      //Creating a ride
      let pPoint = 'pick up here!';
      let noOfSeats = 5;
      let ride = await rideController.createRide(username, pPoint, noOfSeats, event.eventName);
      console.log(ride);

      //Creating registration
      let registration = await registrationController.createRegistration(5, ride.ride, username01);
   });
});