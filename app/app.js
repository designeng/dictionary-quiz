var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),

    routes      = require('./routes/index'),
    users       = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/api/users', users);

module.exports = app;