'use strict';

var _ = require('lodash');
var async = require('async');
var path = require('path');
var NR = require('node-resque');

/* global sails */
module.exports = function ToInitialize(sails) {

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

    async.parallel([
      require('./init/initWorker')(sails, config, jobs),
      require('./init/initScheduler')(sails, config, jobs),
      require('./init/initQueue')(sails, config, jobs)
    ], function(err, result) {
      if (err) {
        return cb(err);
      }
      sails.log.verbose('sails-hook-resque initialized');

      sails.once('lower', require('./onLower')(sails));
      cb();
    });
  };
};
