'use strict';

module.exports = function(sails) {

  return function onLower() {
    if (sails.resque.queue) {
      sails.resque.queue.end();
    }
    if (sails.resque.worker) {
      sails.resque.worker.end();
    }
    if (sails.resque.scheduler) {
      sails.resque.scheduler.end();
    }
  };
};
