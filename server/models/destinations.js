const mongoose = require('mongoose');
let destinationSchema = new mongoose.Schema({
        id: String,
        //Note, use email to track users going
        attendants: [String],
        expireAt: Date
});

destinationSchema.method.addAttendant = function(destId, userId, expireTime, callback, next) {
        this.model("destination").update(destId, { "$addToSet": { "attendants": userId, "expireAt": expireTime } }, { "new": true, "upsert": true },
                function(err, result) {
                        if (err) return next(err);
                        callback(null, true);
                });
};

module.exports = mongoose.model("destination", destinationSchema);