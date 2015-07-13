// Karma configuration
// Generated on Fri Jun 12 2015 08:58:28 GMT+0200 (Central Europe Daylight Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [

            {pattern: 'lib/**/*.js', included: false},
            {pattern: 'app/components/**/*.js', included: false},
            {pattern: 'app/**/*.js', included: false},
            {pattern: 'app/config/appConfig.js', included: false},
            {pattern: 'test/**/*Test.js', included: false},

            'test/test-main.js'
        ],


        // list of files to exclude
        exclude: [
            'app/main.js',
            'lib/angular-scenario/**/*.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/components/**/*.js': ['coverage'],
            'app/api/**/*.js': ['coverage'],
            'app/**/*.html': 'html2js'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
