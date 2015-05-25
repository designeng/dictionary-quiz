"use strict";

var _ = require("lodash");
var models  = require('../models');
var UserController  = require('../controllers/user');
var StateController  = require('../controllers/state');

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
        response = {
            state: "QUIZ_END_WORDS",
            mistakescount: mistakescount,
            userscore: session["userscore"]
        }
        StateController.destroySession(session);
        return res.json(response);
    }

    var dictionary = session['dictionary'];

    words = _.shuffle(words);
    var randomWord = words.shift();
    session['currentWord'] = randomWord;

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
        quizword: randomWord[lang_keys[0]],
        choice: additionalChoice,
        state: "QUIZ_QUESTION"
    }

    res.json(response);
}

var registerAnswer = function(req, res) {
    var session = req.session;
    var mistakescount = session["mistakescount"];
    var userscore = session["userscore"];
    var currentWord = session["currentWord"];
    var point = 0,
        mistake;

    var response = {};

    var updateResponse = function(response, array){
        return _.merge(response, array);
    }

    var value = req.param('value');

    if(typeof value === "undefined"){
        return res.json({error: "VALUE should not be undefined!"});
    }

    var answerLang = "ERROR",
        originLang,
        answerLang;

    value = value.trim();

    if (value.match(/[^A-Za-z]/)){
        originLang = "ru";
        answerLang = "en";
    } else if (value.match(/[^А-Я,а-я]/)){
        originLang = "en";
        answerLang = "ru";
    }

    if (answerLang === "ERROR"){
        response = {
            error: "NOT_VALID_ANSWER_VALUE",
            your_answer: value,
            // debug
            currentWord: currentWord,
            originLang: originLang,
            answerLang: answerLang
        };
        return res.json(response)
    } else {
        response = {};

        if (currentWord[originLang] !== value){
            models.Mistake.create({
                word_id: currentWord["id"],
                lang: originLang,
                value: value
            }).then(
                function() {
                    mistakescount++;
                    session["mistakescount"] = mistakescount;

                    // quiz is over, if {3} mistakes occured
                    if (mistakescount == 3){
                        UserController.saveCurrentUserResult(session);
                        response = updateResponse(response, { state: "QUIZ_END_WITH_MISTAKES", mistakescount: mistakescount, userscore: session["userscore"] });
                        StateController.destroySession(session);

                        return res.json(response)
                    } else {
                        response = updateResponse(response, { state: "NEXT_QUESTION", mistakescount: mistakescount, userscore: session["userscore"] });
                        return res.json(response)
                    }
                },
                function(error) {
                    res.json({ error: error});
                }
            );

        } else {
            point = 1;
            ++userscore;
            session["userscore"] = userscore;

            response =  updateResponse(response, { point: point, userscore: userscore, mistakescount: mistakescount, currentWord: currentWord, answer: value, TEST: 123 });
            return res.json(response)
        }
    }
}

var StepController = {
    getNextQuestion: getNextQuestion,
    registerAnswer: registerAnswer
}

module.exports = StepController