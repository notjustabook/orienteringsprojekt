const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('../models/User');
const Hash = require('../');

mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/test', {useNewUrlParser: true,useUnifiedTopology: true});

console.log('Hello world!');

app.post('/login', async (request, response) => {
    const {username, password} = request.body;
    if (login(username,password)) {
        request.session.username = username;
        response.send({ok: true});
    } else {
        response.send({ok: false});
    }
});

//succesful login
app.get('/session', async (request, response) => {

});

function login(username,password) {
    const user = User.findOne({userName:username});
    return user.password === Hash(password + user.salt);
}