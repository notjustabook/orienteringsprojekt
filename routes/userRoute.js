const express = require('express');
const controller = require("../controllers/eventController");
const router = express.Router();
const sanitize = require('mongo-sanitize');

router
    .post('/', async (req, res) => {
        const name = sanitize(req.body.name);
        const username = sanitize(req.body.username);
        const password = sanitize(req.body.password);
        const confirmPassword = sanitize(req.body.confirmpassword);

        try {
            let user = await controller.getUser(username);
            console.log(user);
            if (user !== null) {
                res.send({ok: false, message: 'user exists'});
            } else if(!checkInputs(name, /^[a-zA-ZÆØÅæøå\-]+$/) || !checkInputs(username, /^[a-zA-Z0-9ÆØÅæøå]+$/)) {
                res.send({ok: false, message: 'Brugernavn og navn må kun indeholde tegn fra A-Å og 0-9'});
            } else if (password !== confirmPassword) {
                res.send({ok: false, message: 'no match'});
            } else {
                try {
                    await controller.createUser(name, username, password);
                    res.send({ok: true, message: 'created'});
                } catch(err) {
                    res.send({ok: false, message: 'Password skal udfyldes'});
                }
            }
        } catch(err) {
            console.log('Noget gik galt: ' + err);
            res.send({ok: false, message: err.message});
        }
    });

function checkInputs(input, regex) {
    return input.match(regex);
}

module.exports = router;