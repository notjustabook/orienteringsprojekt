const express = require('express');
const controller = require("../controllers/eventController");
const router = express.Router();
const sanitize = require('mongo-sanitize');

module.exports = router;