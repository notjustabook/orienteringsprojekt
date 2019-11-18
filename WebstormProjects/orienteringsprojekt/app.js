const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Ride = require('../orienteringsprojekt/models/Ride');
const controller = require('../orienteringsprojekt/controllers/controller');
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log("Connection has been made");
}).on('error', (error) => {
    console.log("Connection error: ", error);
});


app.get('/ride', async function(req, res) {
res.redirect('/ride.html');
});

app.post('/', async function(req, res) {
    console.log('you made a post request');
    let ride = await controller.createRide(req.body.pickUpPoint, Number(req.body.numberOfPassengers));
    await ride.save();
    console.log('Ride saved to database');
});

app.delete('/', async function(req, res) {

});

app.listen(10000);
console.log('Listening on port 10000..');