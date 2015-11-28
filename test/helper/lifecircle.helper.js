/**
 * Module dependencies
 */

var Sails = require('sails').Sails;
var _ = require('lodash');
var async = require('async');

// Use a weird port to avoid tests failing if we
// forget to shut down another Sails app
var TEST_SERVER_PORT = 1577;

var defaultConfig = {
  // dirty port setup.
  port: TEST_SERVER_PORT,
  log: { level: 'warn' },
  hooks: {
    // Inject the sockets hook in this repo into this Sails app
    resque: require('../..')
  },
  loadHooks: ['moduleloader', 'userconfig', 'http', 'resque']
};

module.exports = {

  /**
   *
   * @param config
   * @param done
   */
  setup: function (config, done) {
    if (_.isFunction(config) && !done) {
      done = config;
      config = {};
    }
    if (!_.isPlainObject(config)) {
      config = {};
    }
    // New up an instance of Sails and lift it.
    var app = Sails();

    app.lift(_.defaults(defaultConfig, config), function (err) {
      if (err) return done(err);

      // Set global sails instance
      global.sails = app;

      return done(err, app);
    });

  },

  teardown: function (instance, done) {
    if (_.isFunction(instance) && !done) {
      done = instance;
      instance = sails;
    }
    instance.lower(done);
  }
};
