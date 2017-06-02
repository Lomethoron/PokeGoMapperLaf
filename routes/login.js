module.exports = function (router, passport) {
    router.post('/',
        passport.authenticate('local', {
            successRedirect: '/map',
            failureRedirect: '/',
            failureFlash: true
        })
    );
}
