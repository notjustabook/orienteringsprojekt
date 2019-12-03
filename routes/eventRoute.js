const express = require('express');
const controller = require("../controllers/eventController");
const router = express.Router();
const sanitize = require('mongo-sanitize');

router
    .post('/', async (req,res) => {
        const eventName = sanitize(req.body.eventName);
        const location = sanitize(req.body.location);
        const date = sanitize(req.body.date);

        if (!checkInputs(eventName, /^[(a-zA-Z0-9ÆØÅæøå\- )]+$/) || !checkInputs(location, /^[(a-zA-Z0-9ÆØÅæøå\- )]+$/) || !checkInputs(date, /^((19|20)\d\d[- /.](0[1-9]|1[0-2])[- /.](0?[1-9]|[12]\d|3[01]))$/g)) {
            res.send({message: 'wrong format'});
        } else {
            try {
                let event = await controller.createEvent(eventName, location, date);
                res.send({message: 'created'});
            } catch (err) {
                res.send({message: 'Noget gik galt: ' + err.message});
            }
        }
    });

function checkInputs(input, regex) {
    return input.match(regex) !== null;
}

module.exports = router;