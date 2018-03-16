const mongoose = require('mongoose');
let destinationSchema = new mongoose.Schema({
        id: String,
        //Note, use email to track users going
        attendants: [String],
        expireAt: Date
});

destinationSchema.method.addAttendant = function(destId, userId, expireTime, callback, next) {
        this.model("destination")
};

module.exports = mongoose.model("destination", destinationSchema);