const express = require('express');
const app = express();
const moment = require('moment');
const mongoose = require('mongoose');
const User = require('./models/User');
const config = require('./config');
const userController = require('./controllers/userController');
const rideController = require('./controllers/rideController');
let session = require('express-session');
app.use(express.json());
app.use(session({secret: 'hemmelig hehe', saveUninitialized: true, resave: true}));
app.use(express.static('controllers'));
app.use(express.static('public'));
app.use(express.static('controllers'));
app.use(session({secret: 'hemmelig hehe', saveUninitialized: true, resave: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/orienteringsprojekt', {useNewUrlParser: true,useUnifiedTopology: true});
app.post('/index', async (req, res) => {
    const {username, password} = req.body;
    req.session.driver = username;
    const {status, message} = await userController.login(username, password);
    req.session.loginStatus = status;
    res.send({ok: status, message: message});
});

const userRoute = require('./routes/userRoute');
app.use('/createUser', userRoute);

// Start server

app.get('/ride', async function(req, res) {
    const ok = req.session.loginStatus;
    if (ok) {
        let dates = [];
        const rides = await loadRides();
        const events = await loadEvents();
        events.forEach(function(item) {
           let parsedDate = moment.utc(item.date).format('MMMM Do, YYYY');
            dates.push(parsedDate);
        });
        res.render('ride', {rides: rides, events: events, dates: dates});
    } else
        res.send('piss off wankstain');
});

module.exports = app;
app.delete('/ride', async function(res,req) {

});

app.post('/ride', async function(req, res) {
    console.log('You made a post request!');
    const userName = req.session.driver;
    let ride = await controller.createRide(userName, req.body.pickUpPoint, req.body.numberOfPassengers, req.body.event);
    console.log("ride created: " + ride);
});

app.listen(10000);
console.log('listening on port 10000');


async function loadRides() {
    let rides = await controller.getRides();
    return rides;
}
async function loadEvents() {
    let events = await controller.getEvents();
    return events;
}