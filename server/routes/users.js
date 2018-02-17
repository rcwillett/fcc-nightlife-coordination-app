var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loggedIn', function(req, res, next) {
  if(req.user){
      res.status(200);
      res.json({status: true});
  }
  else{
      res.status(200);
      res.json({status: false});
  }
});

module.exports = router;
