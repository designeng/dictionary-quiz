var express         = require('express');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var FileStore       = require('session-file-store')(session);
var app             = express();
var bodyParser      = require('body-parser');

var routes          = require('./routes/index');

app.use(cookieParser());
app.use(session(
    { 
        secret: 'rikitikitavi',
        store: new FileStore,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 1000 * 1000}
    }
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/', express.static('client'));

module.exports = app;