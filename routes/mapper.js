var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// As of 10/25/2017 - Gen 3
var MAX_DEX_NUMBER = 366;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function ensureLoggedIn(req, res, next) {
    //passport creates this object when logging in
    if (req.user) {
        next();
    }
    else {
        console.log("redirecting");
        res.redirect('/');
    }
});

router.get('/', function (req, res, next) {
    console.log("User logged in and rendering map");
    res.render('map', { title: 'PokeMap' });
});

router.post('/', function (req, res, next) {
    var submitter = req.user;
    var species = req.body.species;
    var catchtime = req.body.catchtime;
    var spawntime = req.body.spawntime;
    var lat = req.body.lat;
    var lng = req.body.lng;

    // verify submission
    // submitter is verified by passport?
    // species number needs to be a dex number from one of the currently released generations
    // matches any group of digits, takes the first group
    species = species.match('\\d +')[0];
    console.log(species);

    res.json({ foo: 'bar' });

});

module.exports = router;