define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {

    "use strict";

    var dashboardModule = ng.module('dashboardModule', ['ui.router']);

    couchPotato.configureApp(dashboardModule);

    dashboardModule.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

        $stateProvider
            /**
             * Main state of the ManageUI
             * This state is abstract, only the child states are used
             */
            .state('app', {
                abstract: true,
                reloadOnSearch: false,
                views: {
                    root: {
                        templateUrl: 'components/dashboard/dashboardView.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'components/dashboard/employees/employeesListController',
                                'components/dashboard/employee/employeeNewController',
                                'components/dashboard/employee/employeeEditController',
                                'components/login/loginInfoDirective'
                            ])
                        }
                    }
                }
            })


        $urlRouterProvider.otherwise('/login');

    });

    dashboardModule.run(function ($couchPotato) {
        dashboardModule.lazy = $couchPotato;
    });

    return dashboardModule;

});
