'use strict';

var app      = require('../../app/app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('user creation page', function () {
    beforeEach(function () {
        this.models = require('../../app/models');

        return Bluebird.all([
            this.models.User.destroy({ truncate: true })
        ]);
    });

    it('loads correctly', function (done) {
        request(app).get('/api').expect(200, done);
    });

    it('lists a user if there is one', function (done) {
        this.models.User.create({ username: 'user_one' }).then(function () {
            request(app).get('/api').expect(/user_one/, done);
        })
    });

    it('lists the tickets for the user if available', function (done) {
        this.models.User.create({ username: 'user_one' }).bind(this).then(function (user) {
            return this.models.Quiz.create({ title: 'user_one quiz', UserId: user.id });
        }).then(function () {
            request(app).get('/api').expect(/user_one quiz/, done);
        });
    });
});
