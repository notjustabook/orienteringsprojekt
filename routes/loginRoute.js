const express = require('express');
const controller = require("../controllers/userController");
const router = express.Router();
const sanitize = require('mongo-sanitize');

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    req.session.driver = username;
    const {status, message} = await controller.login(username, password);
    req.session.loginStatus = status;
    res.send({ok: status, message: message});
});

module.exports = router;