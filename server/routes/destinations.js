const express = require('express');
const router = express.Router();
const request = require('request');

router.get('search-destinations', function(req, res, next){
    let requestInfo = {
        url: "https://api.yelp.com/v3/businesses/search",
        headers: {
            'headers': "Bearer " + process.env.YELP_API_KEY
        },
        qs: {
            'location': req.query.search
        }
    };
    request.get(requestInfo, function(err, resp, body){
        if(err || resp.statusCode !== 200){
            next(new Error("Request to business API Failed"));
        }
        resp.json(JSON.parse(body));
    });
});

module.exports = router;
