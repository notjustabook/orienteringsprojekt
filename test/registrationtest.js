const assert = require('assert');
const Reg = require('../models/Registration');
const userReq = require('../models/User');
const eventReg = require('../models/Event');
const rideReg = require('../models/Ride');
const controller = require('../controllers/controller');
const should = require('should');

// this test requires a user and a user with a ride.
describe('Registration Test', function() {
   it('Create Registration', async function() {
      //Create user and save to database
      let name01 = 'John Nielsen';
      let username01 = 'JN1944';
      let password01 = 'John1234';
      const user1 = await controller.createUser(name01, username01, password01);

      //create user and save to DB, then Create a ride associated with this user.
      let name = 'Ride Holdenson';
      let username = 'xRHx';
      let password = 'xxxxxx';
      const user2 = await controller.createUser(name, username, password);

      // create an event to hold a ride.
      let eventName = 'E1';
      let location = 'Here!'
      let date = new Date();
      const event =  controller.createEvent(eventName, location, date);

      //Creating a ride
      let pPoint = 'pick up here!';
      let noOfSeats = 5;
      const ride = await controller.createRide(user2.username, pPoint, noOfSeats, event.eventName);
      console.log(ride);
      //const Reg =  controller.createRegistration(ride.PickUpPoint, username01, 2);

      //Creating registration
      const registration = await controller.createRegistration()
   });
   /*
   it('Should have 2 passengers',  function() {
         assert(Reg.noOfPassengers === 2);
   });
*/

});

