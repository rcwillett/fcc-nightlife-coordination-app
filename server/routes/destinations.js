const express = require('express');
const router = express.Router();
const httpHelper = require('../helpers/http-helper');

router.get('local-destinations', function(req, res, next){
  next();
});

module.exports = router;
