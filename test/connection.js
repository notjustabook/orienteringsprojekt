const mongoose = require('mongoose');

//connect to MongoDB
mongoose.connect('mongodb+srv://admin:gOiaNFJ8IdbcwEcL@cluster0-ig3ch.gcp.mongodb.net/orienteringsprojekt?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    console.log("Connection has been made");
}).on('error', (error) => {
    console.log("Connection error: ", error);
});

module.exports = mongoose;