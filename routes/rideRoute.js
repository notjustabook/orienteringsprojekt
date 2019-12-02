const express = require('express');
const rideController = require("../controllers/rideController");
const eventController = require("../controllers/eventController");
const router = express.Router();
const moment = require('moment');
const sanitize = require('mongo-sanitize');

router
    .post('/', async function(req, res) {
        console.log('You made a post request!');
        const userName = req.session.driver;
        let ride = await rideController.createRide(userName, req.body.pickUpPoint, req.body.numberOfPassengers);
        console.log("ride created" + ride);
    })

    .get('/', async function(req, res) {
        const ok = req.session.loginStatus;
        if (ok) {
            let dates = [];
            let rides = await rideController.getRides();
            console.log(rides);
            let events = await eventController.getEvents();
            events.forEach(function(item) {
                let parsedDate = moment.utc(item.date).format('MMMM Do, YYYY');
                dates.push(parsedDate);
            });
            res.render('ride', {rides: rides, events: events, dates: dates});
        } else
            res.send('Der er sket en fejl.');
    })

    .delete('/', async function(res,req) {
        //Do some stuff
});

module.exports = router;