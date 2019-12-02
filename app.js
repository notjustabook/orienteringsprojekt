const express = require('express');
const app = express();
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

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/orienteringsprojekt?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});

console.log('Hello world!');

/*
app.post('/index', async (req, res) => {
    const {username, password} = req.body;
    req.session.driver = username;
    const {status, message} = await userController.login(username, password);
    req.session.loginStatus = status;
    res.send({ok: status, message: message});
});*/

const userRoute = require('./routes/userRoute');
const rideRoute = require('./routes/rideRoute');
const eventRoute = require('./routes/eventRoute');
const loginRoute = require('./routes/loginRoute');

app.use('/createUser', userRoute);
app.use('/ride', rideRoute);
app.use('/event', eventRoute);
app.use('/index', loginRoute);

/*
app.get('/ride', async function(req, res) {
    const ok = req.session.loginStatus;
    if (ok)
        res.redirect('ride.html');
     else
        res.send('piss off wankstain');
});


app.delete('/ride', async function(res,req) {

});

app.post('/ride', async function(req, res) {
    console.log('You made a post request!');
    const userName = req.session.driver;
    let ride = await rideController.createRide(userName, req.body.pickUpPoint, req.body.numberOfPassengers);
    console.log("ride created" + ride);
});
*/

// Start server
const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app;