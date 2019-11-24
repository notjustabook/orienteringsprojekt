const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const user = new Schema({
    name: String,
    username: String,
    password: String,
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

user.methods.comparePasswords = function(toCompare) {
    return bcrypt.compare(toCompare, this.password);
};

module.exports = mongoose.model('User', user);
