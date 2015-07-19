/**
 * Created by Ivana on 14.5.2015..
 */
define([
    'angular',
    'angular-couch-potato',
    'jquery-ui',
    'lodash',
    'angular-ui-router',
    'angular-resource',
    'ui.grid'

], function (ng, couchPotato, _) {
    'use strict';

    var employeesListModule = ng.module('employeesListModule', [
        'ui.router',
        'ngResource',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.bootstrap'
    ]);

    couchPotato.configureApp(employeesListModule);

    employeesListModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.employees', {
                url: '/:employeesType',
                views: {
                    "content@app": {
                        templateUrl: 'components/dashboard/employees/employeesListView.html',
                        controller: 'employeesListController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'api/authService',
                                'api/apiService',
                                'api/userService',
                                'components/dashboard/employees/employeesListService',
                                'components/dashboard/employees/gridRow/employeesRowController',
                                'components/dashboard/employees/gridRow/employeeRowDirective'
                            ])
                        }
                    },

                    search: {
                        templateUrl: 'components/dashboard/layout/rightSidebar/rightSidebarView.html'
                    },

                    navigation: {
                        templateUrl: 'components/dashboard/layout/navigation/navigationView.html'
                    }

                },
                data: {
                    displayName: 'Employees'
                }

            })


    });

    employeesListModule.run(function ($couchPotato) {
        employeesListModule.lazy = $couchPotato;
    });

    return employeesListModule;
});