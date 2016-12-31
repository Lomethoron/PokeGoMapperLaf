var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/views/index.jade'));
});

app.listen(1234, function () {
  console.log('Example app listening on port 1234!');
});