var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(fs);

var app     = require('./app/app'),
    models  = require("./app/models");

app.set('port', process.env.PORT || 8080);

models.sequelize.sync().then(
    function () {
        console.log("------")
        fs.readFileAsync(__dirname + "/sql/init.sql", "utf-8").then(function (queryStatement) {
            
            // console.log(queryStatement);

            setTimeout(function () {
                // var queryStatement = "INSERT INTO `words` SET ??", {en: "apple", ru: "яблоко"}
                var queryStatement = "INSERT INTO WORDS (en, ru) VALUES ('apple', 'яблоко')";
                models.sequelize.query(queryStatement);
                // test
                models.Word.findAll().then(function(words) {
                    console.log("WORDS:::::", words);
                }); 
            }, 2000);
            

            

            var server = app.listen(app.get('port'), function() {
                console.log('Express server listening on port ' + server.address().port);
            });
        });
    }
// .then(function () {
//     var server = app.listen(app.get('port'), function() {
//         console.log('Express server listening on port ' + server.address().port);
//     });
// }
);