"use strict";

var _ = require("lodash");

var getNextQuestion = function(req, res) {
    var response;
    var session = req.session;

    console.log("SESSION:", req.session);

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

var StepController = {
    getNextQuestion: getNextQuestion
}

module.exports = StepController