"use strict";

var models  = require('../models');

var WordController = {

    post: function(req, res) {
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
        },

    get: function(req, res) {
            models.Word.findAll().then(function(words) {
                res.json({ words: words });
            });
        }
}

module.exports = WordController;