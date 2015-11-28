'use strict';

var NR = require('node-resque');

module.exports = function(config, jobs) {

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
    queue.connect(function(err) {
      if (err) {
        return done(err);
      }
      sails.resque.queue = queue;
      sails.log.verbose('sails-hook-resque Queue service initalized');
      done();
    });
  }

  return initQueue;
};
