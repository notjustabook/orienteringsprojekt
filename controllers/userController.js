"use strict";

let path = '../models/';
let User = require(path + 'User');

exports.createUser = function (name, username, password) {
    if (password === '') {
        throw "Password skal udfyldes.";
    }
    const user = new User({
        name: name,
        username: username,
        password: password,
    });
    return user.save();
};

exports.getUser = function(username) {
    return User.findOne({'username': username}).exec();
};

exports.login = async function(username, password) {
    const user = await User.findOne({username: username}).exec();

    if(user === null)
        return {status: false, message: 'Incorrect username'};
    let compare = await user.comparePasswords(password);

    if(!compare)
        return {status: false, message: 'Incorrect password'};

    return {status: true, message: 'Succeeded'};
};