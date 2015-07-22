/**
 * Created by Ivana on 14.5.2015.
 */

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {
    'use strict';

    var employeesListModule = ng.module('employeesListModule', []);

    //adds the 'register' functions for registering and downloading components
    //just-in-time and when needed. See http://laurelnaiad.github.io/angular-couch-potato/docs/#/guide/11-architecture.11-app-module-setup
    couchPotato.configureApp(employeesListModule);

    employeesListModule.config(function ($stateProvider, $couchPotatoProvider, $provide) {

        $stateProvider
            .state('app.employees', {
                url: '/employees/:employeesType',
                views: {
                    content: {
                        templateUrl: 'components/dashboard/employees/employeesListView.html',
                        controller: 'employeesListController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
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

        //set the default gridOptions for all grids in the app
        $provide.decorator('GridOptions', function ($delegate) {
            var gridOptions;
            gridOptions = angular.copy($delegate);
            gridOptions.initialize = function (options) {
                var initOptions;
                initOptions = $delegate.initialize(options);
                initOptions.enableColumnMenus = false;
                initOptions.enableRowSelection = true;
                initOptions.enableRowHeaderSelection = false;
                initOptions.multiSelect = false;
                initOptions.modifierKeysToMultiSelect = false;
                initOptions.noUnselect = true;
                initOptions.enableHorizontalScrollbar = false;
                initOptions.enableVerticalScrollbar = false;
                initOptions.enableFiltering = true;
                initOptions.headerRowHeight = 50;
                initOptions.rowHeight = 50;
                return initOptions;
            };
            return gridOptions;
        });
    });

    employeesListModule.run(function ($couchPotato) {
        //See http://laurelnaiad.github.io/angular-couch-potato/docs/#/guide/11-architecture.11-app-module-setup
        employeesListModule.lazy = $couchPotato;
    });

    return employeesListModule;
});