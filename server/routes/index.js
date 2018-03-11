var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./dist/index.html');
});

/* GET users listing. */
router.get('/loggedIn', function(req, res, next) {
  if(req.user){
      res.status(200);
      res.json({status: true, user: req.user});
  }
  else{
      res.status(200);
      res.json({status: false, user: null});
  }
});

router.get(/[/.js$]?[/.css$]?[/.html]/, express.static('./dist'));

module.exports = router;
