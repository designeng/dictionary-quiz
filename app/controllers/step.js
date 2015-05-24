"use strict";

var _ = require("lodash");

var getNextQuestion = function(req, res) {
    var response;
    var session = req.session;

    // prevent service call for not registred user (player)
    if(typeof session['username'] === "undefined"){
        return res.json({
            username: session['username']
        });
    }

    var words = session["words"];
    var lang_keys = [];

    _.shuffle(words);
    var randomWord = [lang_keys[0]];

    session['current_word'] = randomWord;

    response = {
        quizword: randomWord,
        choice: session["words"],
        state: "QUIZ_QUESTION"
    }

    res.json(response);
}

var StepController = {
    getNextQuestion: getNextQuestion
}

module.exports = StepController