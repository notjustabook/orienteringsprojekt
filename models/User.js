let path = '../models/';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
let Ride = require(path + 'Ride');
const saltRounds = 10;


const user = new Schema({
    name: String,
    username: String,
    password: String,
    rides: [{
        id: Number,
         ref: 'Ride'
        }],

    /*registrations: [{
        type: ObjectId, 
        ref: 'Registration'
    }]*/
});

user.pre('save', async function(next) {
    let user = this;
    try {
        let salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch(err) {
        return next(err);
    }
});

user.methods.comparePasswords = function(toCompare) {
    return bcrypt.compare(toCompare, this.password);
};

module.exports = mongoose.model('User', user);