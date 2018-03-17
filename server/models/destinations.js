const mongoose = require('mongoose');
let destinationSchema = new mongoose.Schema({
        id: String,
        attendants: [String],
        expireAt: Date,
        expireAfterSeconds: { type: Number, default: 0 }
});

destinationSchema.method.addAttendant = function(destId, userId, expireTime, callback, next) {
        this.model("destination")
};

module.exports = mongoose.model("destination", destinationSchema);