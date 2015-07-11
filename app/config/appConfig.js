/**
 * Created by Ivana on 28.5.2015.
 */
var require = {
    waitSeconds: 0,
    paths: {

        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
            'lib/jquery/jquery.min'
        ],
        'jquery-ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',
        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min',
        'angular': ['lib/angular/angular.min'],
        'angular-cookies': ['lib/angular-cookies/angular-cookies.min'],
        'angular-resource': ['lib/angular-resource/angular-resource.min'],
        'angular-sanitize': ['lib/angular-sanitize/angular-sanitize.min'],
        'angular-animate': ['lib/angular-animate/angular-animate.min'],
        'domReady': ['lib/requirejs-domready/domReady'],
        'angular-ui-router': ['lib/angular-ui-router/release/angular-ui-router.min'],
        'ngRoute': ['lib/angular-route/angular-route.min'],
        'angular-bootstrap': ['lib/angular-bootstrap/ui-bootstrap-tpls.min'],
        'angular-couch-potato': ['lib/angular-couch-potato/dist/angular-couch-potato'],
        'fastclick': ['lib/fastclick/lib/fastclick'],
        'select2': ['lib/select2/select2.min'],
        'summernote': ['lib/summernote/dist/summernote.min'],
        'bootstrap-validator': ['lib/bootstrapvalidator/dist/js/bootstrapValidator.min'],
        'lodash': ['lib/lodash/dist/lodash.min'],
        'ui.grid': ['lib/angular-ui-grid/ui-grid.min'],
        'ngStorage': ['lib/ngStorage/ngStorage.min'],
        'checklist-model':['lib/checklist-model/checklist-model'],
        'moment':['lib/moment/min/moment.min'],

        'modules-includes': 'config/config/appIncludes'
    },
    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']},
        'angular-animate': {deps: ['angular']},
        'angular-resource': {deps: ['angular']},
        'angular-cookies': {deps: ['angular']},
        'angular-sanitize': {deps: ['angular']},
        'angular-bootstrap': {deps: ['angular']},
        'angular-ui-router': {deps: ['angular']},
        'jquery-ui': { deps: ['jquery']},
        'ngRoute': {deps: ['angular']},
        'angular-couch-potato': {deps: ['angular']},
        'socket.io': {deps: ['angular']},
        'anim-in-out': {deps: ['angular-animate']},
        'select2': {deps: ['jquery']},
        'summernote': {deps: ['jquery']},
        'bootstrap-validator': {deps: ['jquery']},
        'bootstrap': {deps: ['jquery']},
        'modules-includes': {deps: ['angular']},
        'superbox': {deps: ['jquery']},
        'ui.grid': {deps: ['angular']},
        'ngStorage': {deps: ['angular']},
        'checklist-model': {deps: ['angular']}

    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ]
};