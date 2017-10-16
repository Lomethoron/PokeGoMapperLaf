var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


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

module.exports = router;