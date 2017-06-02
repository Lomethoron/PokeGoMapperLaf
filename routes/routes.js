module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');

    var login = require('./login')(router, passport);
    var map = require('./mapper')(router);

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', { title: 'Login - PokeMap', message: req.flash('error') });
    });

    return router;
}

