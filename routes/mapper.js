module.exports = function (router) {
    router.get('/map', function (req, res, next) {
        res.render('map', { title: 'PokeMap' });
    });
}
