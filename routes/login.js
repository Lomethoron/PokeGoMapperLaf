module.exports = function (app, passport) {
    app.post('/',
        passport.authenticate('local', {
            successRedirect: '/map',
            failureRedirect: '/',
            failureFlash: true
        })
    );
}
