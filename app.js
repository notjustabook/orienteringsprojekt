const express = require('express');
const app = express();
const mongoose = require('mongoose');
const controller = require('../orienteringsprojekt/controllers/controller');

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('controllers'));

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/test', {useNewUrlParser: true,useUnifiedTopology: true});

console.log('Hello world!');

app.post('/index', async (request, response) => {
    const {userName, password} = request.body;
    const loginStatus = await controller.login(userName,password);
        response.send({ok: loginStatus});
});

app.get('/ride', async function(req, res) {
   res.redirect('ride.html');
});

app.delete('/ride', async function(res,req) {

});

app.post('/ride', async function(req, res) {
    console.log('You made a post request!');
    let ride = await controller.createRide(req.body.pickUpPoint, req.body.numberOfPassengers);
    console.log("ride created" + ride);
});

app.listen(10000);
console.log('listening on port 10000');