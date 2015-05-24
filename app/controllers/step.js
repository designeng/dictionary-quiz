"use strict";

var _ = require("lodash");

module.exports = function(req, res) {
    var response;
    var session;

    // prevent service call for not registred user (player)
    if(!session['user_name']){
        return res.json({});
    }

    var words = session["words"];
    var lang_keys;

    _.shuffle(words);
    randomWord = [lang_keys[0]];

    session['current_word'] = randomWord;

    response = {
        quizword: randomWord,
        choice: {},
        state: "QUIZ_QUESTION"
    }

    res.json(response);
}