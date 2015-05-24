"use strict";

var models  = require('../models');

var MistakeController = {

    post: function(req, res) {
            var word_id = req.param('word_id');
            var lang = req.param('lang');
            var value = req.param('value');

            models.Mistake.create({
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

        },

    get: function(req, res) {
            models.Mistake.findAll().then(function(mistakes) {
                res.json({ mistakes: mistakes });
            });
        }
}

module.exports = MistakeController;