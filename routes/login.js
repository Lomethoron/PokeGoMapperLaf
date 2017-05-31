module.exports = function (router) {
    router.post('/', function (req, res) {
        console.log(req.body);
    });
}