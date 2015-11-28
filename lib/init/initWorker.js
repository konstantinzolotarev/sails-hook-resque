'use strict';

var _ = require('lodash');
var NR = require('node-resque');

module.exports = function(sails, config, jobs) {

  /**
   * Initialize Worker to run jobs
   *
   * @param  {Function} done
   */
  function initWorker(done) {
    if (!_.isArray(config.queues)) {
      config.queues = [];
    }

    var worker = new NR.worker({
      connection: config.connection,
      queues: config.queues
    }, jobs);
    worker.connect(function(err) {
      if (err) {
        return done(err);
      }
      if (config.clearQueueOnStartup) {
        // optional: cleanup any previous improperly shutdown workers
        worker.workerCleanup();
      }
      if (config.autoStart.worker) {
        worker.start();
      }
      sails.resque.worker = worker;
      done();
    });
  }

  return initWorker;
};
