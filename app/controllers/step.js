"use strict";

var _ = require("lodash");
var UserController  = require('../controllers/user');

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

    if(!words.length){
        UserController.saveCurrentUserResult(session);
        return res.json({
                state: "QUIZ_END_WORDS",
                userscore: session["userscore"]
            });
    }

    var dictionary = session['dictionary'];

    words = _.shuffle(words);
    var randomWord = words.shift();
    session['current_word'] = randomWord;

    var lang_keys = ["en", "ru"];
    lang_keys = _.shuffle(lang_keys);

    dictionary = _.filter(dictionary, function(item){
        if (item["id"] != randomWord["id"]){
            return true;
        } else {
            return false;
        }
    });

    dictionary = _.shuffle(dictionary);

    var additionalChoice = dictionary.slice(0, 3);
    additionalChoice = _.map(additionalChoice, function(item){
        return item[lang_keys[1]];
    });

    additionalChoice.push(randomWord[lang_keys[1]]);

    _.shuffle(additionalChoice);

    session['words'] = words;

    response = {
        quizword: randomWord,
        choice: additionalChoice,
        state: "QUIZ_QUESTION"
    }

    res.json(response);
}

var StepController = {
    getNextQuestion: getNextQuestion
}

module.exports = StepController