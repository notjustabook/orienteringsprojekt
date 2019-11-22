const express = require('express');
const app = express();
const mongoose = require('mongoose');
const controller = require('../orienteringsprojekt/controllers/controller');
let session = require('express-session');
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('controllers'));
app.use(session({secret: 'hemmelig hehe', saveUninitialized: true, resave: true}));

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/test', {useNewUrlParser: true,useUnifiedTopology: true});

console.log('Hello world!');

app.post('/index', async (req, res) => {
    const {userName, password} = req.body;
    req.session.driver = userName;
    const loginStatus = await controller.login(userName,password);
    req.session.loginStatus = loginStatus;
        res.send({ok: loginStatus});
});

app.get('/ride', async function(req, res) {
    const ok = req.session.loginStatus;
    if (ok)
        res.redirect('ride.html');
     else
        res.send('piss off wankstain')
});

app.delete('/ride', async function(res,req) {

});

app.post('/ride', async function(req, res) {
    console.log('You made a post request!');
    const userName = req.session.driver;
    let ride = await controller.createRide(userName, req.body.pickUpPoint, req.body.numberOfPassengers);
    console.log("ride created" + ride);
});

app.listen(10000);
console.log('listening on port 10000');