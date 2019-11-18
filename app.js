const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('../models/User');
const controller = require('controllers/controller');

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/test', {useNewUrlParser: true,useUnifiedTopology: true});

console.log('Hello world!');

app.post('/login', async (request, response) => {
    const {username, password} = request.body;
    console.log(username + password);
    if (await controller.login(username,password)) {
        request.session.username = username;
        response.send({ok: true});
    } else {
        response.send({ok: false});
    }
});

