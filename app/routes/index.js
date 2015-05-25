var fs      = require("fs");
var express = require('express');
var router  = express.Router();

var models  = require('../models');

var userController      = require('../controllers/user');
var stateController     = require('../controllers/state');
var stepController      = require('../controllers/step');
var wordController      = require('../controllers/word');
var mistakeController   = require('../controllers/mistake');

// in our small quiz application user is a current player, while we have no registration phase. So, we have no update method yet.

router.route("/users")
    .post(userController.post)
    .get(userController.get)
    .delete(userController.delete);

router.route("/words")
    .post(wordController.post)
    .get(wordController.get);

router.route("/mistakes")
    .post(mistakeController.post)
    .get(mistakeController.get)

// Application state route
router.route("/state")
    .get(stateController.getApplicationState);

// Quiz step route: get quiz step quiestion 
router.route("/step")
    .get(stepController.getNextQuestion);

// Quiz step answer route: register answer for current question (step)
router.route("/step/answer")
    .post(stepController.registerAnswer);

// Quiz result score route
// TODO: redirect to /users/{user_id}/score ?
router.route("/score")
    .get(userController.getUserScore);

// debug
router.route("/session/close")
    .get(function(req, res) {
        delete req.session.username;
        res.json({message: "session username removed"})
    });

module.exports = router;
