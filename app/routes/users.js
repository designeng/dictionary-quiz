var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.User.create({
    username: req.param('username')
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.find({
    where: {id: req.param('user_id')},
    include: [models.Quiz]
  }).then(function(user) {
    models.Quiz.destroy(
      {where: {UserId: user.id}}
    ).then(function(affectedRows) {
      user.destroy().then(function() {
        res.redirect('/');
      });
    });
  });
});

router.post('/:user_id/quizzes/create', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).then(function(user) {
    models.Quiz.create({
      title: req.param('title')
    }).then(function(title) {
      title.setUser(user).then(function() {
        res.redirect('/');
      });
    });
  });
});

router.get('/:user_id/quizzes/:quiz_id/destroy', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).then(function(user) {
    models.Quiz.find({
      where: { id: req.param('quiz_id') }
    }).then(function(Quiz) {
      Quiz.setUser(null).then(function() {
        Quiz.destroy().then(function() {
          res.redirect('/');
        });
      });
    });
  });
});


module.exports = router;
