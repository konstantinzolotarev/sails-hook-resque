'use strict';

var expect = require('chai').expect;
var _  = require('lodash');
var sinon = require('sinon');

/* jshint maxlen: false */
describe('Queue - enqueueIn :: ', function () {

  it('resque.queue should exist', function () {
    expect(sails.resque.queue).to.be.an('object');
  });

  it('should enqueue a task', function (done) {
    sails.resque.queue.enqueueIn(500, 'math', 'add', [1, 2], function (err) {
      expect(err).to.not.exist;

      sails.resque.queue.length('math', function (err, value) {
        expect(err).to.not.exist;
        expect(value).to.be.eq(1);
        done();
      });
    });
  });

});
