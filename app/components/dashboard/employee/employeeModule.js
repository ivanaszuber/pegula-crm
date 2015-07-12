/**
 * Created by Ivana on 17.5.2015..
 */

define([
        'angular',
        'angular-couch-potato',
        'angular-ui-router',
        'angular-resource',
        'angular-sanitize',
    ]
    , function (ng, couchPotato) {

        'use strict';

        var employeeModule = ng.module('employeeModule', [
            'ui.router',
            'ngResource',
            'ngSanitize'
        ]);

        couchPotato.configureApp(employeeModule);

        employeeModule.config(function ($stateProvider, $couchPotatoProvider) {

            $stateProvider
                .state('app.newEmployee', {
                    url: '/employee/new',
                    reloadOnSearch: false,
                    onEnter: function () {
                        $('body').addClass("minifiedRight");
                    },
                    onExit: function () {
                        $('body').removeClass("minifiedRight");
                    },
                    views: {
                        "content@app": {
                            controller: 'employeeNewController',
                            templateUrl: 'components/dashboard/employee/employeeNewView.html',
                            resolve: {
                                deps: $couchPotatoProvider.resolveDependencies([
                                    'api/apiService',
                                    'api/userService',
                                    'components/dashboard/employee/employeeEmailDirective'
                                ])}
                            },
                        search: {},
                        navigation: {
                            templateUrl: 'components/dashboard/layout/navigation/navigationView.html'
                        }
                    },
                    data: {
                        displayName: 'New Employee'
                    }
                })

                .state('app.editEmployee', {
                    url: '/employee/edit',
                    reloadOnSearch: false,
                    onEnter: function () {
                        $('body').removeClass("minifiedRight");
                    },
                    views: {
                        "content@app": {
                            controller: 'employeeEditController',
                            templateUrl: 'components/dashboard/employee/employeeEditView.html',
                            resolve: {
                                deps: $couchPotatoProvider.resolveDependencies([
                                    'api/apiService',
                                    'api/userService'
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
                        displayName: 'Edit User'
                    }

                })



        });

        employeeModule.run(function ($couchPotato) {
            employeeModule.lazy = $couchPotato;
        });

        return employeeModule;
    });