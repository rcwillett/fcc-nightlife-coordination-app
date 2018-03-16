const express = require('express');
const router = express.Router();

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

router.get('/logout', function(req, res, next){
  if(req.user){
    req.logout();
    res.status(200);
    res.json({status: true, msg: "Successfully Logged Out"});
  }
  else{
    res.status(500);
    res.json({status: false, msg: "Error: Not logged in"});
  }
});

router.get(/[/.js$]?[/.css$]?[/.html]/, express.static('./dist'));

module.exports = router;
