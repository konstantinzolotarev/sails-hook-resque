'use strict';

module.exports = {

  __configKey__: {

    /**
     * Connection details for resque service
     *
     * @see {@link https://github.com/taskrabbit/node-resque}
     * @type {Object}
     */
    connection: {
      package: 'ioredis',
      host: '127.0.0.1',
      password: '',
      port: 6379,
      database: 0,
      namespace: 'resque'
    },

    /**
     * Path to your resque Jobs in application
     *
     * @type {String}
     */
    jobsPath: 'api/jobs'
  }
};
