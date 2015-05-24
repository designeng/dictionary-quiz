var _ = require("lodash");

var app     = require('./app/app'),
    initialize = require('./app/initialize'),
    models  = require("./app/models");

app.set('port', process.env.PORT || 8080);

var test = function(){
    models.Word.findAll().then(function(words) {
        _.forEach(words, function(w){
            console.log(w.id, w.en, w.ru);
        });
    });
}

var startServer = function(){
    var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
}

models.sequelize.sync().then(function () {
    initialize().then(startServer);
});