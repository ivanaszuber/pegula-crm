var tests = [];
for (var file in window.__karma__.files) {
    if (/Test\.js$/.test(file)) {
        tests.push(file);
    }
}

require.config({

    baseUrl: '/base/app',

    paths: {
        /**
         * Vendor files that we have to load for the tests
         * These have been excluded in karma.conf
         */
        'jquery': '../app/lib/jquery/dist/jquery',
        'angular': '../app/lib/angular/angular',
        'angular-mocks': '../app/lib/angular-mocks/angular-mocks',
        'angular-cookies': '../app/lib/angular-cookies/angular-cookies',
        'angular-couch-potato': '../app/lib/angular-couch-potato/dist/angular-couch-potato',
        'angular-ui-router': '../app/lib/angular-ui-router/release/angular-ui-router',
        'jquery-ui': '../app/lib/jquery-ui/jquery-ui',
        'underscore': '../app/lib/lodash/dist/lodash',
        'angular-resource': '../app/lib/angular-resource/angular-resource.min',
        'angular-sanitize': '../app/lib/angular-sanitize/angular-sanitize.min',
        'angular-animate': '../app/lib/angular-animate/angular-animate.min',
        'domReady': '../app/lib/requirejs-domready/domReady',
        'ngRoute': '../app/lib/angular-route/angular-route.min',
        'angular-bootstrap': '../app/lib/angular-bootstrap/ui-bootstrap-tpls.min',
        'fastclick': '../app/lib/fastclick/lib/fastclick',
        'select2': '../app/lib/select2/select2.min',
        'summernote': '../app/lib/summernote/dist/summernote.min',
        'lodash': '../app/lib/lodash/dist/lodash.min',
        'ui.grid': '../app/lib/angular-ui-grid/ui-grid',
        'ngStorage': '../app/lib/ngstorage/ngStorage.min',
        'checklist-model': '../app/lib/checklist-model/checklist-model',
        'moment': '../app/lib/moment/moment',


        /**
         * app files used by the app that have been excluded in karma.conf
         */
        //MODULES
        'app': '../app/appModule',

        'employeeEditController':'../app/components/dashboard/employee/employeeEditController',
        'employeeModule':'../app/components/dashboard/employee/employeeModule',
        'employeeNewController':'../app/components/dashboard/employee/employeeNewController',

        'employeesRowController':'../app/components/dashboard/employees/gridRow/employeesRowController',
        'employeesListController':'../app/components/dashboard/employees/employeesListController',
        'employeesListModule':'../app/components/dashboard/employees/employeesListModule',
        'employeesListService':'../app/components/dashboard/employees/employeesListService',

        'activitiesController':'../app/components/dashboard/layout/activities/activitiesController',
        'activitiesDirective':'../app/components/dashboard/layout/activities/activitiesDirective',
        'activitiesService':'../app/components/dashboard/layout/activities/activitiesService',

        'leftSidebarDirective':'../app/components/dashboard/layout/leftSidebar/leftSidebarDirective',

        'rightSidebarDirective':'../app/components/dashboard/layout/rightSidebar/rightSidebarDirective',

        'userEditController':'../app/components/dashboard/user/userEditController',
        'userEmailDirective':'../app/components/dashboard/user/userEmailDirective',
        'userModule':'../app/components/dashboard/user/userModule',
        'userNewController':'../app/components/dashboard/user/userNewController',
        'userPasswordDirective':'../app/components/dashboard/user/userPasswordDirective',

        'usersListModule':'../app/components/dashboard/users/usersListModule',
        'usersListController':'../app/components/dashboard/users/usersListController',

        'dashboardModule':'../app/components/dashboard/dashboardModule',

        'loginModule':'../app/components/login/loginModule',
        'loginController':'../app/components/login/loginController',
        'loginInfoDirective':'../app/components/login/loginInfoDirective',
        'resetPasswordController':'../app/components/login/resetPasswordController',

        'apiService':'../app/api/apiService',
        'authService':'../app/api/authService',
        'clientService':'../app/api/clientService',
        'employeeService':'../app/api/employeeService',
        'userService':'../app/api/userService',

        'smartNotification': '../app/lib/pegula-lib/js/SmartNotification.min'
    },

    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']},
        'angular-animate': {deps: ['angular']},
        'angular-mocks': {deps: ['angular']},
        'angular-resource': {deps: ['angular']},
        'angular-cookies': {deps: ['angular']},
        'angular-sanitize': {deps: ['angular']},
        'angular-bootstrap': {deps: ['angular']},
        'angular-ui-router': {deps: ['angular']},
        'jquery-ui': {deps: ['jquery']},
        'ngRoute': {deps: ['angular']},
        'angular-couch-potato': {deps: ['angular']},
        'socket.io': {deps: ['angular']},
        'anim-in-out': {deps: ['angular-animate']},
        'select2': {deps: ['jquery']},
        'summernote': {deps: ['jquery']},
        'bootstrap-validator': {deps: ['jquery']},
        'bootstrap': {deps: ['jquery']},
        'modules-includes': {deps: ['angular']},
        'ui.grid': {deps: ['angular']},
        'ngStorage': {deps: ['angular']},
        'checklist-model': {deps: ['angular']},
        'smartNotification': {deps: ['jquery']}
    },

    deps: tests,

    callback: window.__karma__.start
});
