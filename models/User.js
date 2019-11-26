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
        type: ObjectId,
         ref: 'Ride'
        }],
    
    registrations: [{
        type: ObjectId, 
        ref: 'Registration'
    }]

});

user.pre('save', function(next) {
   let user = this;
   bcrypt.genSalt(saltRounds, function (err, salt) {
       if (err) return next(err);

       bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) return next(err);

           user.password = hash;
           next();
       })
   })
});

user.methods.comparePasswords = async function(toCompare) {
    return await bcrypt.compare(toCompare, this.password);
};

module.exports = mongoose.model('User', user);
