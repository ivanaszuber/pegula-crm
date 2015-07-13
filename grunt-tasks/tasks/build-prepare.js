var fs = require('fs-extra');
var _ = require('lodash');


var potatoEntities =
    [
        'controller',
        'factory',
        'directive',
        'value',
        'filter',
        'decorator',
        'service'
    ];

module.exports = function (grunt) {

    grunt.registerMultiTask('turnOffPotatoDeclaration',
        'prepare files for requirejs build', function () {

            this.files.forEach(function (mapping) {

                mapping.src.map(function (path) {
                    var script = grunt.file.read(path);

                    var requireWrite = false;
                    _.forEach(potatoEntities, function (entity) {
                        var regexp = new RegExp('register' + entity.charAt(0).toUpperCase() + entity.slice(1), 'gm')

                        if (script.match(regexp)) {
                            script = script.replace(regexp, entity);
                            requireWrite = true;
                        }
                    });

                    if (requireWrite)
                        grunt.file.write(path, script);
                });

            });
            return true;
        });


    grunt.registerMultiTask('turnOnPotatoDeclaration',
        'prepare files for requirejs build', function () {

            this.files.forEach(function (mapping) {

                mapping.src.map(function (path) {
                    var script = grunt.file.read(path);

                    var requireWrite = false;
                    _.forEach(potatoEntities, function (entity) {
                        var regexp = new RegExp('module.' + entity + '\\s*\\(', 'gm');

                        if (script.match(regexp)) {
                            script = script.replace(regexp, 'module.register' + entity.charAt(0).toUpperCase() + entity.slice(1) + '(');
                            requireWrite = true;
                        }
                    });

                    if (requireWrite)
                        grunt.file.write(path, script);
                });

            });
            return true;
        });


    grunt.registerMultiTask('addIncludes',
        'prepare files for requirejs build', function () {

            var options = this.options();
            this.files.forEach(function (mapping) {

                mapping.src.map(function (path) {
                    var script, scriptMatcher, scriptUpdate;


                    // wrapping file to define
                    if (options.wrapToDefine) {
                        script = grunt.file.read(path);
                        script = "define(['angular'], function(){" + script + "})";
                        grunt.file.write(path, script);
                    }

                    // injecting module to app file
                    if(options.injectToApp){
                        script = grunt.file.read(options.appFile);
                        scriptMatcher = script.match(/module\s*\([\s\S]+?\]/m);
                        if(scriptMatcher){
                            scriptUpdate = scriptMatcher[0].replace(/\]/, ',"' + options.name + '"]');
                            script = script.replace(scriptMatcher[0], scriptUpdate);
                        }
                        grunt.file.write(options.appFile, script);
                    }


                    // writing to includes file
                    script = grunt.file.read(options.includesFile);
                    script = script.replace(/\]/gm, ',"' + options.name + '"]');
                    grunt.file.write(options.includesFile, script);

                });

            });
            return true;
        });

};