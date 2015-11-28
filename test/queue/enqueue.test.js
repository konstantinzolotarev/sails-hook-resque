'use strict';

var expect = require('chai').expect;
var _  = require('lodash');
var sinon = require('sinon');

describe('Queue - enqueue :: ', function () {

  it('resque.queue should exist', function () {
    expect(sails.resque.queue).to.be.an('object');
  });

  it('should enqueue a task', function (done) {
    sails.resque.queue.enqueue('math', 'add', [1, 2], function (err, enqueued) {
      expect(err).to.not.exist;
      expect(enqueued).to.be.true;

      sails.resque.queue.length('math', function (err, value) {
        expect(err).to.not.exist;
        expect(value).to.be.eq(1);
        done();
      });
    });
  });

});
