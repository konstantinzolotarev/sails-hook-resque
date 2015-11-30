'use strict';

var expect = require('chai').expect;

/* jshint maxlen: false */
describe('Basic :: ', function() {

  it('Sails.js should run', function() {
    expect(sails).to.be.ok;
  });

  it('resque hook should load', function() {
    expect(sails.hooks.resque).to.be.ok;
    expect(sails.resque).to.be.ok;
  });

  it('resque hook should create list of jobs', function() {
    expect(sails.resque.jobs).to.be.an('object');
  });

  it('resque should init queue service and have enqueue/enqueueIn functions', function() {
    expect(sails.resque.queue).to.be.an('object')
      .and.have.property('enqueue')
      .and.to.be.a('function');

    expect(sails.resque.queue).to.be.an('object')
      .and.have.property('enqueueIn')
      .and.to.be.a('function');
  });

  it('resque worker should be created', function () {
    expect(sails.resque.worker).to.be.an('object')
      .and.have.property('on')
      .and.to.be.a('function');
  });

  it('resque scheduler should be created', function () {
    expect(sails.resque.scheduler).to.be.an('object')
      .and.have.property('on')
      .and.to.be.a('function');
  });
});
