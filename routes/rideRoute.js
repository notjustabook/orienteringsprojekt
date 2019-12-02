const express = require('express');
const controller = require("../controllers/rideController");
const router = express.Router();
const sanitize = require('mongo-sanitize');

router
    .post('/', async function(req, res) {
        console.log('You made a post request!');
        const userName = req.session.driver;
        let ride = await controller.createRide(userName, req.body.pickUpPoint, req.body.numberOfPassengers);
        console.log("ride created" + ride);
    })

    .get('/', async function(req, res) {
        const ok = req.session.loginStatus;
        if (ok)
            res.redirect('ride.html');
        else
            res.send('Noget gik galt. Prøv venligst igen.');
    })

    .delete('/', async function(res,req) {
        //Do some stuff
});

module.exports = router;