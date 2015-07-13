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

        var userModule = ng.module('userModule', [
            'ui.router',
            'ngResource',
            'ngSanitize'
        ]);

        couchPotato.configureApp(userModule);

        userModule.config(function ($stateProvider, $couchPotatoProvider) {

            $stateProvider
                .state('app.browse.newUser', {
                    url: '/user/new',
                    reloadOnSearch: false,
                    onEnter: function () {
                        $('body').addClass("minifiedRight");
                    },
                    onExit: function () {
                        $('body').removeClass("minifiedRight");
                    },
                    views: {
                        "content@app": {
                            controller: 'userNewController',
                            templateUrl: 'components/management/user/userNewView.html',
                            resolve: {
                                deps: $couchPotatoProvider.resolveDependencies([
                                    'shared/apiServices/apiService',
                                    'shared/apiServices/userService',
                                    'components/management/user/userEmailDirective',
                                    'components/management/user/userPasswordDirective'
                                ])}
                            },
                        rightSidebar: {},
                        subHeader: {
                            templateUrl: 'components/management/browse/subHeader/subheaderView.html'
                        }
                    },
                    data: {
                        displayName: 'New User'
                    }
                })

                .state('app.browse.editUser', {
                    url: '/user/edit',
                    reloadOnSearch: false,
                    onEnter: function () {
                        $('body').removeClass("minifiedRight");
                    },
                    views: {
                        "content@app": {
                            controller: 'userEditController',
                            templateUrl: 'components/management/user/userEditView.html',
                            resolve: {
                                deps: $couchPotatoProvider.resolveDependencies([
                                    'shared/apiServices/apiService',
                                    'shared/apiServices/userService'
                                ])
                            }
                        },
                        rightSidebar: {
                            templateUrl: 'components/management/approvals/rightSidebar/filterApprovalsView.html'
                        },
                        subHeader: {
                            templateUrl: 'components/management/browse/subHeader/subheaderView.html'
                        }
                    },
                    data: {
                        displayName: 'Edit User'
                    }

                })



        });

        userModule.run(function ($couchPotato) {
            userModule.lazy = $couchPotato;
        });

        return userModule;
    });