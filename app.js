var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


var app = express();

var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

/*var https = require('https');
var http = require('http');
var key = fs.readFileSync('keys/private.key');
var cert = fs.readFileSync('keys/certificate.crt');

var httpsOptions = {
    key: key,
    cert, cert
};

var httpsRedirect = require('express-force-ssl');
app.use(httpsRedirect);*/

// Connection URL
var dburl = 'mongodb://localhost:27017/pokeTracker';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    cookie: {maxAge: 6000 },
    store: new MongoStore({ url: dburl }),
    resave: true,
    secret: 'lolsecret'
}));
app.use(flash());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    MongoClient.connect(dburl, function (err, db) {
        if (err) return done(err);

        // find user
        var users = db.collection('users');
        users.find({ _id: id }).next(function (err, user) {
            db.close();
            done(err, user);
        });
    });
})

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("AUTHENTIC AUTHENTICATION AUTHENTICATING!");
        MongoClient.connect(dburl, function(err, db) {
            if (err) return done(err);

            // find user
            var users = db.collection('users');
            users.find({ username: username }).next(function (err, user) {
                if (err) {
                    db.close();
                    return done(err);
                }
                if (!user) {
                    db.close();
                    return done(null, false, { message: 'Incorrect Username and Password' });
                }
                //need to ensure this is not plaintext during signup or being sent
                if (user.password !== password) {
                    db.close();
                    return done(null, false, { message: 'Incorrect Username and Password' });
                }
                db.close();
                return done(null, user);
            });
        });
    })
);

var routes = require('./routes/routes')(passport);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(1234, function () {
    console.log('Server now running on port 1234');
});
/*https.createServer(httpsOptions, app).listen(1234, function() {
    console.log('Https server running on port 1234');
});

http.createServer(app).listen(2345, function() {
    console.log('Http redirect server running on 2345');
})*/


