"use strict";

var models  = require('../models');
var StateController  = require('../controllers/state');

var UserController = {

    post: function(req, res) {
            StateController.setInitialApplicationState(req, res, req.param('username'));
        },

    get: function(req, res) {
            models.User.findAll({
                include: [ models.Quiz ]
            }).then(function(users) {
                res.json({ users: users });
            })
        },

    delete: function(req, res) {
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
            })
        },

    saveCurrentUserResult: function(session) {
            models.User.create({
                username: session["username"],
                userscore: session["userscore"]
            }).then(
                function() {
                    console.log("User quiz result:", session["userscore"]);
                },
                function(error) {
                    console.log(error);
                }
            )
        },

    getUserScore: function(req, res) {
            var session = req.session;
            res.json({userscore: session["userscore"]});

            // quiz logical end, destroy session now
            StateController.destroySession(session);
            res.end();
        }
}

module.exports = UserController;