const express = require('express');
const app = express();
const mongoose = require('mongoose');
const controller = require('../orienteringsprojekt/controllers/controller');

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('controllers'));

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/test', {useNewUrlParser: true,useUnifiedTopology: true});

console.log('Hello world!');

app.post('/index', async (req, res) => {
    const {userName: username, password} = req.body;
    const loginStatus = await controller.login(username,password);
    if(loginStatus === true){
        req.index.user = username;
        res.send({ok: loginStatus});
    }
});

app.get('/ride', async function(req, res) {
    if(req.ride.user)
        res.redirect('ride');
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