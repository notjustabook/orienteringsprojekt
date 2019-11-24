const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registration = new Schema({

    // muligvis noget object validation inden
    noOfPassangers: Number,
    ride: Object,
    rideTaker: Object
});

module.exports = mongoose.model('Registration', registration);