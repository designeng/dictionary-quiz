var _ = require("lodash");
var sequence = require("when/sequence");
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

    var addToQueue = function (cb) {
        queue.push(cb);
    }

    var queue = [];

    models.Word.destroy({ truncate: true }).then(function () {
        addToQueue(noop);
    });

    _.forEach(pairs, function (pair) {
        models.Word.create({
            en: pair[0],
            ru: pair[1]
        }).then(function (res) {
            addToQueue(noop);
        });
    });

    return sequence(queue);
}

module.exports = initialize;