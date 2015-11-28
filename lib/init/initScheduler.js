'use strict';

var NR = require('node-resque');

module.exports = function(sails, config, jobs) {

  /**
   * Initialize resque scheduler
   *
   * @param  {Function} done
   */
  function initScheduler(done) {
    var scheduler = new NR.scheduler({
      connection: config.connection
    });
    scheduler.connect(function(err) {
      if (err) {
        return done(err);
      }
      if (config.autoStart.scheduler) {
        scheduler.start();
      }
      sails.resque.scheduler = scheduler;
      done();
    });
  }

  return initScheduler;
};
