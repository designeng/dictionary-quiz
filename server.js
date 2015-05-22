var app = require('./app/app');

// console.log("app", app);

var models = require("./app/models");

app.set('port', process.env.PORT || 8080);

models.sequelize.sync().then(function () {
    var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
});