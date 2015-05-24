'use strict';

var expect = require('expect.js');

describe('models/quiz', function () {
    beforeEach(function () {
        this.Quiz = require('../../app/models').Quiz;
    });

    describe('create', function () {
        it('creates a quiz', function () {
            return this.Quiz.create({ title: 'a quiz title' }).then(function (quiz) {
                expect(quiz.title).to.equal('a quiz title');
            });
        });
    });
});
