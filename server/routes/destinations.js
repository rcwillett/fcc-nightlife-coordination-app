const express = require('express');
const router = express.Router();
const request = require('request');
const NodeCache  = require('node-cache');
const destCache = new NodeCache({ stdTTL: 21600, checkperiod: 0 });
const passportAuth = require('../auth/passport.js');
const destinations = require('../models/destinations.js');

router.get('/search-destinations', handleSearchRequest);
router.post('/going', passportAuth.isAuthenticated, handleAttendingDesinationRequest);

module.exports = router;

function handleSearchRequest (req, res, next) {
    let cacheKey = req.query.search.replace(/^[\w]/, '').toLowerCase();
    destCache.get(cacheKey, function(err, value){
        if (err || value === undefined){
            getYelpSearchResults(req, res, next, cacheKey)
        }
        else{
            res.json(value);
        }
    });
}

function getYelpSearchResults (req, res, next, cacheKey) {
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
    request.get(requestInfo, function(err, resp, body){
        let parsedResponse;
        if (err || resp.statusCode !== 200){
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

function handleAttendingDesinationRequest (req, res, next){
    let serverTime = new Date();
    
    // let expiryTime = req.body.date
    // destinations.addAttendant(req.body.destinationId, req.user.github);
    console.log(req.body);
    console.log(req.user);
    res.statusCode = 200;
    res.json({status: true, message: 'user Added'});
}
