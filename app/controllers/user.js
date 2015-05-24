"use strict";

var models  = require('../models');
var StateController  = require('../controllers/state');

var UserController = {

    post: function(req, res) {
            var username = req.param('username');

            models.User.create({
                username: username
            }).then(
                function() {
                    res.json({ message: 'User with username ' + username + ' registered for quiz!' });
                    StateController.setInitialApplicationState(req.session);
                },
                function(error) {
                    res.json({ error: error});
                }
            )
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
        }
}

module.exports = UserController;