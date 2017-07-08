var express = require('express');
var router = express.Router();

/* GET users listing. */
// matching pattern is the route specified when the module is imported (i.e. '/users') plus whatever is defined in this file (i.e. '/')
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
