const expect = require('chai').expect;
const Reg = require('../models/Registration');
let controller = require('../controllers/controller');

// this test requires a user and a user with a ride.
describe('Registration', async () => {
   //Create user and save to database
   let name01 = 'John Nielsen';
   let username01 = 'JN1944';
   let password01 = 'John1234';
   await controller.createUser(name01, username01, password01);

   //create user and save to DB, then Create a ride associated with this user.
   let name = 'Ride Holdenson';
   let username = 'xRHx';
   let password = 'xxxxxx';
   await controller.createUser(name, username, password);

   //^creating ride
   let pPoint = 'pick up here!';
   let noOfSeats = 5;
   await controller.createRide( );

   it('Should save to MongoDB',  async function() {
         
   });






});

