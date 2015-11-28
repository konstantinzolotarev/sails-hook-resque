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
     * Should host clear all queues on app start
     *
     * @type {Boolean}
     */
    clearQueueOnStartup: true,

    /**
     * List of queues for worker
     *
     * @type {Array}
     */
    queues: ['sails'],

    /**
     * Path to your resque Jobs in application
     *
     * @type {String}
     */
    jobsPath: 'api/jobs',

    /**
     * Should hook start worker and scheduler automatically on app start ?
     *
     * @type {Object}
     */
    autoStart: {

      /**
       * Should worker be autostarted on app start. Defaults to `true`
       *
       * If set to `false` you will need to do it manually in your application
       * Example:
       * ```javscript
       * // ...
       * sails.resque.worker.start();
       * ```
       *
       * @type {Boolean}
       */
      worker: true,
      /**
       * Should scheduler be autostarted on app start. Defaults to `true`
       *
       * If set to `false` you will need to do it manually in your application
       * Example:
       * ```javscript
       * // ...
       * sails.resque.scheduler.start();
       * ```
       * @type {Boolean}
       */
      scheduler: true
    }
  }
};
