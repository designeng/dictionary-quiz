'use strict';

var expect = require('expect.js');
var models = require('../../app/models');

describe('models/index', function () {
    it('returns the quiz model', function () {
        expect(models.Quiz).to.be.ok();
    });

    it('returns the user model', function () {
        expect(models.User).to.be.ok();
    });
});
