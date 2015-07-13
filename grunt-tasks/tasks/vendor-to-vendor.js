var fs = require('fs-extra');

var _ = require('lodash');

var pkg = require('../package.json');

var vendorDir = __dirname  + '/../' +  pkg.pegula.lib;
var vendor = __dirname  + '/../' +  pkg.pegula.tmp_lib;

var dependencies = require('./vendor-to-vendor.json');


module.exports = function (grunt) {

    grunt.registerTask('vendor-to-vendor',
        'copy required files from vendor packages to build/vendor directory', function () {

            if (fs.existsSync(vendorDir)) {
                _(dependencies).forEach(function (dependency) {

                    if (fs.existsSync(vendorDir + dependency)) {
                        fs.copySync(vendorDir + dependency, vendor + dependency);
                    } else {
                        throw grunt.util.error('Required path doesn\'t exist: ' + vendorDir + dependency)
                    }

                })

            }
            else {
                throw grunt.util.error('Required path doesn\'t exist: ' + vendorDir)
            }
        });
};