"use strict";

var _ = require("lodash");
var models  = require(__dirname + "/../models");

var getApplicationState = function(req, res) {
    var response;
    var username = req.session['username'];

    if (!username){
        response = {
            state: "INIT_USER_STATE",
            username: username
        } 
    } else {
        response = {
            state: "QUESTIONS_STATE", 
            username: username
        } 
    }

    res.json(response);
}

// session initialization
var setInitialApplicationState = function(req, res, username) {

    req.session.username = username;
    req.session.words = req.session.dictionary = [];
    req.session.userscore = 0;
    req.session.mistakescount = 0;

    models.Word.findAll().then(function(words) {
        _.forEach(words, function (word) {
            req.session["words"].push({id: word.id, en: word.en, ru: word.ru});
        });

        req.session.dictionary = req.session["words"];

        res.json({ 
            message: 'User with username ' + username + ' registered for quiz!'
        });
    });
}

var destroySession = function (session) {
    session.destroy(function (error) {
        // TODO: session destroy error report
    });
}

var StateController = {
    getApplicationState: getApplicationState,
    setInitialApplicationState: setInitialApplicationState,
    destroySession: destroySession
}

module.exports = StateController