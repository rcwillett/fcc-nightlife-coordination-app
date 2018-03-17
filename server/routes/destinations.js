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
            checkIfUserAttending(req, res, next, value);
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
            console.log(err);
            next(new Error(err));
        }
        else {
            parsedResponse = JSON.parse(body);
            destCache.set(cacheKey, parsedResponse);
            checkIfUserAttending(req, res, next, parsedResponse);
        }
    });
}

function checkIfUserAttending(req, res, next, yelpResp){
    let mappedResp;
    let destinationIds;
    if(req.user) {
        destinations.find({'attendants': req.user.github}, function(err, result) {
           if(err) return next(err);
            destinationIds = result.map((destination) => destination.id);
            mappedResp = mapYelpResp(yelpResp.businesses, destinationIds);
            res.json(mappedResp);
        });
    }
    else {
        mappedResp = mapYelpResp(yelpResp.businesses, []);
        res.json(mappedResp);
    }
}

function handleAttendingDestinationRequest(req, res, next) {
    let serverTime = new Date();
    let serverTimeOffset = serverTime.getTimezoneOffset();
    let userTimeToMidnightMs = 86400000 - (Date.now() - req.body.timeOffset * 60000) % 86400000;
    let serverExpiryTimeMs = Date.now() + userTimeToMidnightMs;
    let serverExpiryTime = new Date(serverExpiryTimeMs);
    
    destinations.update({ "id" : req.body.destinationId }, { "$addToSet": { "attendants": req.user.github }, "$set": { "expireAt": serverExpiryTime } }, { "new": true, "upsert": true },
        function(err, result) {
            if (err) return next(err);
            res.statusCode = 200;
            res.json({ status: true, message: 'user Added' });
        });
}

function mapYelpResp(yelpResp, attendingDestinations){
    return yelpResp.map((yelpDestination) => {
        return new yelpBusinessObject(yelpDestination, attendingDestinations);
    });
}

//Decorated Yelp Object
class yelpBusinessObject {
    constructor(yelpObject, attendingDestinations){
        Object.assign(this, yelpObject);
        this.attending = attendingDestinations.indexOf(yelpObject.id) >= 0;
    }
}