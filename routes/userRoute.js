const express = require('express');
const controller = require("../controllers/controller");
const router = express.Router();

router
    .post('/', async (req, res) => {
        const {name, userName, password} = req.body;
        try {
            await controller.createUser(name, userName, password);
            res.send({ok: true});
        } catch(err) {
            console.log('Something went wrong: ' + err);
            res.send({ok: false});
        }
    });