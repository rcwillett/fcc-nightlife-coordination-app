const express = require('express');
const router = express.Router();
const request = require('request');

router.get('local-destinations', function(req, res, next){
  next();
});

module.exports = router;
