'use strict';

var _ = require('lodash');
var async = require('async');
var path = require('path');
var NR = require('node-resque');

/* global sails */
module.exports = function ToInitialize(app) {

  return function initialize(cb) {

    // Get application path
    var appPath = sails.config.appPath;
    var config = sails.config[this.configKey];
    config = _.defaults(config, require('./defaults'));

    var jobsPath = path.resolve(sails.config.appPath, config.jobsPath);

    var jobs = require('include-all')({
      dirname: jobsPath,
      filter: /(.+)\.js$/,
      excludeDirs: /^\.(git|svn)$/,
      optional: true
    });

    // Create an global resque object
    sails.resque = {
      jobs: jobs
    };

    /**
     * Initialize resque queue connection and service
     *
     * @param  {Function} done
     */
    function initQueue(done) {
      sails.log.verbose('sails-hook-resque starting initialize resque queue');
      // Setup resque queue
      var queue = new NR.queue({
        connection: config.connection
      }, jobs);

      queue.on('error', function(error) {
        sails.log.error(error);
      });
      queue.connect(function (err, res) {
        if (err) {
          return done(err);
        }
        console.log(typeof queue.enqueue);
        sails.resque.queue = queue;
        sails.log.verbose('sails-hook-resque Queue service initalized');
        done();
      });
    }

    async.parallel([
      initQueue
    ], function (err, result) {
      if (err) {
        return cb(err);
      }
      sails.log.verbose('sails-hook-resque initialized');
      cb();
    });
  };
};
