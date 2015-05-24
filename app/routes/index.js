var models  = require('../models');
var express = require('express');
var router  = express.Router();

var state   = require('../controllers/state');
var step    = require('../controllers/step');

router.get('/', function(req, res) {
    models.User.findAll({
        include: [ models.Quiz ]
    }).then(function(users) {
        res.json({ users: users });
    });
});

// USER

// Just to demonstrate REST methods.
// in our quiz application user is a current player, while we have no registration. So, we have no update method.
router.route("/users")
    .post(function(req, res) {
        var username = req.param('username');

        models.User.create({
            username: username
        }).then(
            function() {
                res.json({ message: 'User with username ' + username + ' created!' });
            },
            function(error) {
                res.json({ error: error});
            }
        );
    })
    .get(function(req, res) {
        models.User.findAll({
            include: [ models.Quiz ]
        }).then(function(users) {
            res.json({ users: users });
        });
    })
    .delete(function(req, res) {
        var user_id = req.param('user_id');
        models.User.find({
            where: {id: user_id},
            include: [models.Quiz]
        })
        .then(function(user) {
            models.Quiz.destroy({where: {UserId: user.id}}).then(function(affectedRows) {
                user.destroy().then(function() {
                    res.json({ message: 'User with id ' + user_id + ' deleted!' });
                });
            });
        });
    });

// WORD

router.route("/words")
    .post(function(req, res) {
        var en = req.param('en');
        var ru = req.param('ru');

        models.Word.create({
            en: en,
            ru: ru
        }).then(
            function() {
                res.json({ message: 'Word with values EN: ' + en + ' and RU:' + ru + ' created!' });
            },
            function(error) {
                res.json({ error: error});
            }
        );
    })
    .get(function(req, res) {
        models.Word.findAll().then(function(words) {
            res.json({ words: words });
        });
    });

// WORD

router.route("/mistakes")
    .post(function(req, res) {
        var word_id = req.param('word_id');
        var lang = req.param('lang');
        var value = req.param('value');

        models.Mistakes.create({
            word_id: word_id,
            lang: lang,
            value: value
        }).then(
            function() {
                res.json({ message: 'Mistake with values LANG: ' + lang + ' and VALUE:' + value + ' for wordID: ' + word_id + ' registered!' });
            },
            function(error) {
                res.json({ error: error});
            }
        );

    })
    .get(function(req, res) {
        models.Mistake.findAll().then(function(mistakes) {
            res.json({ mistakes: mistakes });
        });
    })

// Application state route
router.route("/state")
    .get(state);

// Quiz step route
router.route("/step")
    //get quiz step quiestion 
    .get(step);

module.exports = router;
