"use strict";

var _ = require("lodash");
var models  = require(__dirname + "/../models");

var getApplicationState = function(req, res) {
    var response;
    var user_name = req.session['user_name'];

    if (!user_name){
        response = {
            state: "INIT_USER_STATE",
            user_name: user_name
        } 
    } else {
        response = {
            state: "Q_STATE", 
            user_name: user_name
        } 
    }

    res.json(response);
}

var setInitialApplicationState = function(session) {

    // session initialization
    session["words"] = [];

    models.Word.findAll().then(function(words) {
        _.forEach(words, function (word) {
            session["words"].push({id: word.id, en: word.en, ru: word.ru});
        });

        console.log("SESSION WORDS:::", session["words"]);
    });
     
}

var StateController = {
    getApplicationState: getApplicationState,
    setInitialApplicationState: setInitialApplicationState
}

module.exports = StateController