
module.exports = function(config) {

  var watchMode = process.env.WATCH === '1';
  var bail      = process.env.BAIL  === '1';
  var grep      = process.env.GREP;

  var conf = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/browser.js',
      'test/helpers/utils/stub-logs.js',
      {
        pattern  : 'src/**/*-test.js',
        watched  : false,
        included : true,
        served   : true
      },
      {
        pattern  : 'test/**/*-test.js',
        watched  : false,
        included : true,
        served   : true
      }
    ],

    plugins: [
      require('karma-mocha'),
      require('karma-webpack'),
      require('karma-firefox-launcher'),
      require('karma-spec-reporter'),
      require('karma-coverage')
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*-test.js': ['webpack'],
      'test/**/*-test.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [process.env.REPORTER || 'dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    babelPreprocessor: {
      options: {
        presets: ['react', 'es2015', 'stage-1']
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    client: {
      mocha: {
        bail: bail,
        grep: grep
      }
    },

    //
    webpack: require('./webpack.config.js')[0],

    //
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,


    // enable / disable watching file and executing tests whenever any file changes
    //autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !watchMode,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  };

  config.set(conf);
}
