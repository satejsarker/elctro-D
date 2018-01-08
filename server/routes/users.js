var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var value=1
  res.send('user',{value:value});
});

module.exports = router;
