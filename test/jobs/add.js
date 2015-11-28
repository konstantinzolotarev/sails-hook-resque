'use strict';

module.exports = {
  plugins: ['jobLock'],
  pluginOptions: {
    jobLock: {},
  },
  perform: function(a, b, callback) {
    callback(null, (a + b));
  },
};
