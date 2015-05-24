var _ = require("lodash");
var pipeline = require("when/pipeline");
var models  = require(__dirname + "/models");

var pairs = [
    ["apple", "яблоко"],
    ["pear", "груша"],
    ["orange", "апельсин"],
    ["grape", "виноград"],
    ["lemon", "лимон"],
    ["pineapple", "ананас"],
    ["watermelon", "арбуз"],
    ["coconut", "кокос"],
    ["banana", "банан"],
    ["pomelo", "помело"],
    ["strawberry", "клубника"],
    ["raspberry", "малина"],
    ["melon", "дыня"],
    ["peach", "персик"],
    ["apricot", "абрикос"],
    ["mango", "манго"],
    ["plum", "слива"],
    ["pomegranate", "гранат"],
    ["cherry", "вишня"]
];

var initialize = function () {

    var noop = function () {}

    var addToTasks = function (cb) {
        tasks.push(cb);
    }

    var tasks = [];

    models.Word.destroy({ truncate: true }).then(function () {
        addToTasks(noop);
    });

    _.forEach(pairs, function (pair) {
        models.Word.create({
            en: pair[0],
            ru: pair[1]
        }).then(function () {
            addToTasks(noop);
        });
    });

    return pipeline(tasks);
}

module.exports = initialize;