const mongoose = require('mongoose');
const destinationSchema = new mongoose.Schema({
        id: String,
        //Note, use email to track users going
        usersGoing: [String]
});
    
module.exports = mongoose.model("destination", destinationSchema);