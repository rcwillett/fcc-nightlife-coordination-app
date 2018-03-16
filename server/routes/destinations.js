const express = require('express');
const router = express.Router();
const request = require('request');
const NodeCache = require('node-cache');
const destCache = new NodeCache({ stdTTL: 21600, checkperiod: 0 });
const passportAuth = require('../auth/passport.js');
const destinations = require('../models/destinations.js');

router.get('/search-destinations', handleSearchRequest);
router.post('/going', passportAuth.isAuthenticated, handleAttendingDesinationRequest);

module.exports = router;

function handleSearchRequest(req, res, next) {
    let cacheKey = req.query.search.replace(/^[\w]/, '').toLowerCase();
    destCache.get(cacheKey, function(err, value) {
        if (err || value === undefined) {
            getYelpSearchResults(req, res, next, cacheKey)
        }
        else {
            res.json(value);
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
            res.json(parsedResponse);
        }
    });
}

function handleAttendingDesinationRequest(req, res, next) {
    let serverTime = new Date();
    let serverTimeOffset = serverTime.getTimezoneOffset();
    let userTimeToMidnightMs = 86400000 - (Date.now() - req.body.timeOffset * 60000) % 86400000;
    let serverExpiryTimeMs = Date.now() + userTimeToMidnightMs;
    let serverExpiryTime = new Date(serverExpiryTimeMs);
    
    destinations.update({ "id" : req.body.destinationId }, { "$addToSet": { "attendants": req.user.github }, "$set": { "expireAt": serverExpiryTime } }, { "new": true, "upsert": true },
        function(err, result) {
            if (err) return next(err);
            console.log(result);
            res.statusCode = 200;
            res.json({ status: true, message: 'user Added' });
        });
}