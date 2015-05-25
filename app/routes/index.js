var fs      = require("fs");
var express = require('express');
var router  = express.Router();

var models  = require('../models');

var UserController      = require('../controllers/user');
var StateController     = require('../controllers/state');
var StepController      = require('../controllers/step');
var WordController      = require('../controllers/word');
var MistakeController   = require('../controllers/mistake');

// in our small quiz application user is a current player, while we have no registration phase. So, we have no update method yet.

router.route("/users")
    .post(UserController.post)
    .get(UserController.get)
    .delete(UserController.delete);

// TODO: words and mistakes for admin purposes, so route callbacks should be wrapped in user role validator (require('connect-roles') middleware)
router.route("/words")
    .post(WordController.post)
    .get(WordController.get);

router.route("/mistakes")
    .post(MistakeController.post)
    .get(MistakeController.get)

// Application state route
router.route("/state")
    .get(StateController.getApplicationState);

// Quiz step route: get quiz step quiestion 
router.route("/step")
    .get(StepController.getNextQuestion);

// Quiz step answer route: register answer for current question (step)
router.route("/step/answer")
    .post(StepController.registerAnswer);

// Quiz result score route
// TODO: redirect to /users/{user_id}/score ?
router.route("/score")
    .get(UserController.getUserScore);

module.exports = router;
