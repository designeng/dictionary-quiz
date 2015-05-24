var fs      = require("fs");
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    indexHtml = fs.readFileSync(__dirname + '/../../client/index.html', 'utf-8');
    res.sendfile(__dirname + '/../../client/index.html');
});

module.exports = router;