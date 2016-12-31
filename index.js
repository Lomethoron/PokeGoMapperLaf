var app = require('./app');
var routes = require('./routes.js');
var googleMapsClient = require('@google/maps').createClient({
		key: process.env.GOOGLE_MAP_KEY
});


app.listen(1234, function () {
	console.log('Example app listening on port 1234!');
});