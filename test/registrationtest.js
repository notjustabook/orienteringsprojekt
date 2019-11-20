const expect = require('chai').expect;
const Reg = require('../models/Registration');
let controller = require('../controllers/controller');

// this test requires a user and a user with a ride.
describe('Registration', async () => {
   //Create user and save to database
   let name = 'John Nielsen';
   let userName = 'JN1944';
   let password = 'John1234';
   await controller.createUser(name, userName, password);

   //create user and save to DB, then Create a ride associated with this user.
   let name = 'Ride Holdenson';
   let userName = 'xRHx';
   let password = 'xxxxxx';
   await controller.createUser(name, userName, password);

   //^creating ride
   let pPoint = 'pick up here!';
   let noOfSeats = 5;
   await controller.createRide( )

});

