var express = require('express');
var router = express.Router();

var login = require('./login')(router);
var map = require('./mapper')(router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
