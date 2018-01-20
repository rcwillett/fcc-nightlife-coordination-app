const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/search-destinations', function(req, res, next){
    let requestInfo = {
        headers: {
            'Authorization': "Bearer " + process.env.YELP_API_KEY
        },
        qs: {
            'location': req.query.search
        },
        url: "https://api.yelp.com/v3/businesses/search"
    };
    request.get(requestInfo, function(err, resp, body){
        if(err || resp.statusCode !== 200){
            next(new Error(err));
        }
        else{
            res.json(JSON.parse(body));
        }
    });
});

module.exports = router;
