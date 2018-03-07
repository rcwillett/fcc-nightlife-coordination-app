var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./dist/index.html');
});

router.get(/[/.js$]?[/.css$]?[/.html]/, express.static('./dist'));

module.exports = router;
