// BASE SETUP
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users  = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use('/api', routes);
app.use('/users', users);

// START THE SERVER
// =============================================================================
// app.listen(port);
// console.log('Magic happens on port ' + port);

module.exports = app;