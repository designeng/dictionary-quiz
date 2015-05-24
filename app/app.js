var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),

    routes      = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

module.exports = app;