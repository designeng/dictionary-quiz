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

module.exports = router;
