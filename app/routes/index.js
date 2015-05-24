var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    models.User.findAll({
        include: [ models.Quiz ]
    }).then(function(users) {
        res.json({ users: users });
    });
});

// Just to demonstrate REST methods.
// in our quiz application user is a current player, while we have no registration. So, we have no update method.
router.route("/users")
    .post(function(req, res) {
        var username = req.param('username').trim();
        if(typeof username !== "undefined" && username.length){
            models.User.create({
                username: username
            }).then(function() {
                res.json({ message: 'User with username ' + username + ' created!' });
            });
        } else {
            res.json({ error: 'User username should be defined!' });
        }
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

module.exports = router;
