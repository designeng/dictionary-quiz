var models  = require('../models');
var express = require('express');
var router  = express.Router();

var userController      = require('../controllers/user');
var stateController     = require('../controllers/state');
var stepController      = require('../controllers/step');
var wordController      = require('../controllers/word');
var mistakeController   = require('../controllers/mistake');

router.get('/', function(req, res) {
    models.User.findAll({
        include: [ models.Quiz ]
    }).then(function(users) {
        res.json({ users: users });
    });
});

// USER

// in our quiz application user is a current player, while we have no registration phase. So, we have no update method yet.

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

module.exports = router;
