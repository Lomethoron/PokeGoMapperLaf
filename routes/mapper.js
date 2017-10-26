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
    verified = true;
    validation = {
        species: true,
        catchtime: true,
        spawntime: true,
        lat: true,
        lng: true
    }
    // submitter is verified by passport?

    // species number needs to be a dex number from one of the currently released generations
    // matches any group of digits, takes the first group
    species = (species.match('\\d+') || [null])[0]; //if .match is null, we get the null from the array, this seems really dumb
    if (species < 1 || species > MAX_DEX_NUMBER || species == null) {
        verified = false;
        validation.species = false;
        validation.species.message = "Please do not select a Digimon";
    }

    // catch time needs to be non-negative
    catchtime = (catchtime.match('-?\\d+') || [null])[0];
    if (catchtime[0] < 0 || catchtime == null) {
        verified = false;
        validation.catchtime = false;
        validation.catchtime.message = "Please enter a non-negative number, time travel is not supported by this application."
    }

    // catch time needs to be non-negative
    spawntime = (spawntime.match('-?\\d+') || [null])[0];
    if (spawntime < 0 || spawntime == null) {
        verified = false;
        validation.spawntime = false;
        validation.spawntime.message = "Please enter a non-negative number, time travel is not supported by this application."
    }

    // latitude needs to be between -90 and 90
    lat = (lat.match('-?\\d+\\.?\\d+') || [null])[0];
    if (lat < -90 || lat > 90 || lat == null) {
        verified = false;
        validation.lat = false;
        validation.lat.message = "That latitude is out of this world!"
    }

    // longitude needs to be between -180 and 180
    lng = (lng.match('-?\\d+\\.?\\d+') || [null])[0];
    if (lng < -180 || lng > 180 || lng == null) {
        verified = false;
        validation.lng = false;
        validation.lng.message = "That longitude is out of this world!"
    }

    res.json(validation);

});

module.exports = router;