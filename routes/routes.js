module.exports = function (passport, app) {
    //var login = require('./login')(app, passport);
    var map = require('./mapper');

    /* GET home page. */
    app.get('/', function (req, res, next) {
        res.render('index', { title: 'Login - PokeMap', message: req.flash('error') });
    });
    app.post('/',
        passport.authenticate('local', {
            successRedirect: '/map',
            failureRedirect: '/',
            failureFlash: true
        })
    );

    app.use('/map', map);
    return;
}

