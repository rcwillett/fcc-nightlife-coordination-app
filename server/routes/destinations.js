const express = require('express');
const router = express.Router();
const request = require('request');
const NodeCache = require('node-cache');
const destCache = new NodeCache({ stdTTL: 21600, checkperiod: 0 });
const passportAuth = require('../auth/passport.js');
const destinations = require('../models/destinations.js');

router.get('/search-destinations', handleSearchRequest);
router.post('/going', passportAuth.isAuthenticated, handleAttendingDestinationRequest);

module.exports = router;

function handleSearchRequest(req, res, next) {
    let cacheKey = req.query.search.replace(/^[\w]/, '').toLowerCase();
    destCache.get(cacheKey, function(err, value) {
        if (err || value === undefined) {
            getYelpSearchResults(req, res, next, cacheKey)
        }
        else {
            addAttendingInformation(req, res, next, value);
        }
    });
}

function getYelpSearchResults(req, res, next, cacheKey) {
    let requestInfo = {
        headers: {
            'Authorization': "Bearer " + process.env.YELP_API_KEY
        },
        qs: {
            'location': req.query.search,
            'categories': 'Nightlife'
        },
        url: "https://api.yelp.com/v3/businesses/search"
    };
    request.get(requestInfo, function(err, resp, body) {
        let parsedResponse;
        if (err || resp.statusCode !== 200) {
            next(new Error(err));
        }
        else {
            parsedResponse = JSON.parse(body);
            destCache.set(cacheKey, parsedResponse);
            addAttendingInformation(req, res, next, parsedResponse);
        }
    });
}

function addAttendingInformation(req, res, next, yelpResp) {
    Promise.all([getUsersAttending(yelpResp.businesses), checkIfUserAttending(req.user, yelpResp.businesses)]).then(
        function(databaseResults) {
            let usersAttendingResults = databaseResults[0];
            let userAttendingResults = databaseResults[1];
            let mappedResult = mapYelpResp(yelpResp.businesses, userAttendingResults, usersAttendingResults);
            res.json(mappedResult);
        },
        function(err){
            next(new Error(err));
        }
    );
}

function getUsersAttending(yelpResp) {
    let yelpRespIds = yelpResp.map((destination) => destination.id);
    let destinationIds  = {};
    return new Promise(function(resolve, reject) {
        destinations.find({ 'id': { '$in': yelpRespIds } }, function(err, result) {
            if (err) return reject(err);
            result.forEach(function(destination){
                destinationIds[destination.id] = destination.attendants.length;
            });
            resolve(destinationIds);
        });
    });
}

function checkIfUserAttending(userInfo, yelpResp) {
    let destinationIds = {};
    return new Promise(function(resolve, reject) {
        if (userInfo) {
            destinations.find({ 'attendants': userInfo.github }, function(err, result) {
                if (err) return reject(err);
                result.forEach(function(destination){
                    destinationIds[destination.id] = null;
                });
                resolve(destinationIds);
            });
        }
        else {
            resolve({});
        }
    });
}

function handleAttendingDestinationRequest(req, res, next) {
    let serverTime = new Date();
    let serverTimeOffset = serverTime.getTimezoneOffset();
    let userTimeToMidnightMs = 86400000 - (Date.now() - req.body.timeOffset * 60000) % 86400000;
    let serverExpiryTimeMs = Date.now() + userTimeToMidnightMs;
    let serverExpiryTime = new Date(serverExpiryTimeMs);

    destinations.update({ "id": req.body.destinationId }, { "$addToSet": { "attendants": req.user.github }, "$set": { "expireAt": serverExpiryTime } }, { "new": true, "upsert": true },
        function(err, result) {
            if (err) return next(err);
            res.statusCode = 200;
            res.json({ status: true, message: 'user Added' });
        });
}

function mapYelpResp(yelpResp, attendingDestinations, attendedDestinations) {
    console.log(attendingDestinations, attendedDestinations);
    return yelpResp.map((yelpDestination) => {
        return new yelpBusinessObject(yelpDestination, attendingDestinations, attendedDestinations);
    });
}

//Decorated Yelp Object
class yelpBusinessObject {
    constructor(yelpObject, attendingDestinations, attendedDestinations) {
        let attendants = attendedDestinations.hasOwnProperty(yelpObject.id) ? attendedDestinations[yelpObject.id] : 0;
        Object.assign(this, yelpObject);
        this.attending = attendingDestinations.hasOwnProperty(yelpObject.id);
        this.attendants = this.attending ? attendants++ : attendants;
    }
}