var requirejsCompileSkip = require('./tasks/requirejs-compile-skip.json');

var pkg = require('./package.json');


var pub = pkg.pegula.public;
var tmp = pkg.pegula.temp;
var bld = pkg.pegula.build;

module.exports = function (grunt) {

    grunt.initConfig({

        //switch directive/controller/factory files from lazy-loading to regular angular declarations
        // (is required for annotation)
        turnOffPotatoDeclaration: {
            tmp: {
                expand: true,
                src: [
                    tmp + 'components/**/*.js',
                    tmp + 'api/**/*.js',
                    tmp + 'appModule.js',
                    tmp + 'appController.js',
                    tmp + 'lib/pegula-lib/**/*.js'
                ]
            }
        },

        //adds AngularJS dependency injection annotations
        //without it minification would not be possible
        ngAnnotate: {
            tmp: {
                expand: true,
                src: [
                    tmp + 'components/**/*.js',
                    tmp + 'api/**/*.js',
                    tmp + 'appModule.js',
                    tmp + 'appController.js',
                    tmp + 'lib/pegula-lib/**/*.js'
                ],
                ext: '.js', // Dest filepaths will have this extension.
                extDot: 'last'
            }
        },

        //switch back to lazy-loading
        turnOnPotatoDeclaration: {
            tmp: {
                expand: true,
                src: [
                    tmp + 'components/**/*.js',
                    tmp + 'api/**/*.js',
                    tmp + 'appModule.js',
                    tmp + 'appController.js',
                    tmp + 'lib/pegula-lib/**/*.js'
                ]
            }
        },

        // concatenate all *.html files to one angular module
        html2js: {
            options: {
                base: tmp,
                module: 'templates',
                singleModule: true,
                rename: function (moduleName) {
                    return moduleName;
                }
            },
            main: {
                src: [tmp + '**/*.html'],
                dest: tmp + 'templates.js'
            }
        },

        //additional includes for build (templates from prev step)
        addIncludes: {
            options: {
                appFile: tmp + 'appModule.js',
                includesFile: tmp + 'config/appIncludes.js'
            },
            templates: {
                options: {
                    angularModule: true,
                    wrapToDefine: true,
                    name: 'templates',
                    injectToApp: true
                },
                src: [
                    tmp + 'templates.js'
                ]

            }

        },

        //minification
        uglify: {
            tmp: {
                expand: true,
                cwd: tmp,
                src: [
                    '**/*.js'
                ],
                dest: tmp,
                ext: '.js'
            }
        },

        //erase temp and build dirs
        clean: {
            pre: {
                options: {
                    force: true
                },
                src: [
                    bld,
                    tmp
                ]
            },
            post: {
                options: {
                    force: true
                },
                src: [
                    tmp
                ]
            }
        },

        //copy files from public/src to the temp and build
        copy: {
            pre: {
                expand: true,
                cwd: pub + 'app/',
                src: [
                    '**',
                    '!**/lib/**'
                ],
                dest: tmp
            },
            post: {
                expand: true,
                cwd: tmp,
                src: [
                    'lib/**/*.*',
                    'components/**/*.json',
                    'assets/**/*.png',
                    'assets/**/*.css',
                    'index.html',
                    'config/appConfig.js'
                ],
                dest: bld
            }
        },
        //r.js on temp/main.js to build/main.js dir.
        // requirejs-compile-skip.json is used to exclude files from build (useful for cdn and reduce compiled file.
        // If not used, all required in main.js plugin files will be included to build file)
        requirejs: {
            compile: {
                options: {
                    baseUrl: tmp,
                    paths: requirejsCompileSkip,
                    mainConfigFile: tmp + 'config/appConfig.js',
                    name: "main",
                    optimize: 'none',
                    uglify2: {
                        mangle: false
                    },
                    out: bld + 'main.js',
                    done: function (done, output) {
                        console.log('done requirejs');
                        done();
                    }
                }
            }
        },

        //append a hash to all .js and .css files
        //and rename file references in index.html and appConfig.js
        hashres: {
            prod: {
                options: {
                    renameFiles: true
                },
                src: [
                    tmp + 'lib/**/*.js',
                    tmp + 'lib/pegula-lib/css/*.css',
                    bld + 'main.js',
                    tmp + 'assets/css/style.css'
                ],
                dest: [tmp + 'index.html', tmp + 'config/appConfig.js']
            }
        },

        //main has been renamed so we need to remove this reference
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: "define('main',",
                            replacement: "define("

                        }
                    ],
                    usePrefix: false
                },
                files: [
                    {src: [bld + 'main.js'], dest: bld}
                ]
            },

            //temporarily add .js extension to all appConfig files
            //so we can use the hashres on them
            pre: {
                options: {
                    patterns: [
                        {
                            match: "'],",
                            replacement: ".js'],"

                        }
                    ],
                    usePrefix: false
                },
                files: [
                    {src: [tmp + 'config/appConfig.js'], dest: tmp + 'config/appConfig.js'}
                ]
            },

            //delete the added .js extension as requirejs works without extensions
            post: {
                options: {
                    patterns: [
                        {
                            match: '.js"],',
                            replacement: '"],'
                        }
                    ],
                    usePrefix: false
                },
                files: [
                    {src: [tmp + 'config/appConfig.js'], dest: tmp + 'config/appConfig.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-hashres');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.loadNpmTasks('grunt-html2js');

    grunt.loadNpmTasks('grunt-replace');

    grunt.loadTasks('tasks');

    grunt.registerTask('default', [

        'clean:pre',
        'copy:pre',
        'replace:pre',
        'vendor-to-vendor',
        'turnOffPotatoDeclaration',
        'ngAnnotate:tmp',
        'turnOnPotatoDeclaration',
        'html2js',
        'addIncludes',
        'uglify',
        'requirejs',
        'replace:dist',
        'hashres',
        'replace:post',
        'copy:post',
        'clean:post',
    ]);
};