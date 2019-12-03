const express = require('express');
const app = express();
const mongoose = require('mongoose');
let session = require('express-session');

app.use(express.json());
app.use(express.static('public'));
app.use(session({secret: 'hemmelig hehe', saveUninitialized: true, resave: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/orienteringsprojekt', {useNewUrlParser: true,useUnifiedTopology: true});

const userRoute = require('./routes/userRoute');
const rideRoute = require('./routes/rideRoute');
const eventRoute = require('./routes/eventRoute');
const loginRoute = require('./routes/loginRoute');

app.use('/createUser', userRoute);
app.use('/ride', rideRoute);
app.use('/event', eventRoute);
app.use('/index', loginRoute);

app.listen(10000);
console.log('listening on port 10000');