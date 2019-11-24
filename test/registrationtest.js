const expect = require('chai').expect;
const Reg = require('../models/Registration');
let controller = require('../controllers/controller');

// this test requires a user and a user with a ride.
describe('Registration Test', async () => {
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

   //^creating ride
   let pPoint = 'pick up here!';
   let noOfSeats = 5;
   const ride = await controller.createRide(user2.driver ,pPoint, 5 );

   const Reg = await controller.createRegistration(ride, user1, 2 );

   it('test 1',  async function() {
         
  

   });






});

