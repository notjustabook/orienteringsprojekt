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

exports.login = async function(username,password) {
    const user = await User.findOne({userName: username}).exec();
    if(user == null)
        return 'Incorrect username';
    if(!await user.comparePasswords(password))
        return 'Incorrect password';
    return await user.comparePasswords(password);
};