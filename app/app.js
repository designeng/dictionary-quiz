var express         = require('express'),
    cookieParser    = require('cookie-parser');
    session         = require('express-session'),
    app             = express(),
    bodyParser      = require('body-parser'),

    routes          = require('./routes/index');

app.use(cookieParser());
app.use(session({ secret: 'rikitikitavi', cookie: { maxAge: 60 * 1000 }}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

module.exports = app;