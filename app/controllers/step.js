"use strict";

var _ = require("lodash");

var getNextQuestion = function(req, res) {
    var response;
    var session = req.session;

    console.log("SESSION:::::::::::::", session, session['user_name']);

    return res.json({
            user_name: 123
        });

    // prevent service call for not registred user (player)
    if(typeof session['user_name'] === "undefined"){
        return res.json({
            user_name: session['user_name']
        });
    } else {
        return res.json({
            words: session["words"]
        });
    }

    var words = session["words"];
    var lang_keys;

    console.log("SESSION words::::", words);

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