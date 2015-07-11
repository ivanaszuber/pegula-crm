/**
 * Created by Ivana on 21.5.2015..
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {
    "use strict";

    var module = ng.module('loginModule', [
        'ui.router'
    ]);
    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: "components/login/loginView.html",
                        controller: 'loginController'
                    }
                }
            })
            .state('logout', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: "components/login/loginView.html",
                        controller: function ($scope, $location, authService) {
                            authService.logout();
                        },
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'api/authService'
                            ]),
                            authenticated: ['authService', function (authService) {
                                return authService.authenticationStatus();
                            }]
                        }
                    }
                }
            })
            .state('app.resetPassword', {
                url: '/resetPassword',
                reloadOnSearch: false,
                onEnter: function () {
                    $('body').removeClass("minifiedRight");
                },
                views: {
                    "content@app": {
                        controller: 'resetPasswordController',
                        templateUrl: 'components/login/resetPasswordView.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'components/dashboard/user/userPasswordDirective'
                            ])
                        }
                    },
                    search: {
                        templateUrl: 'components/dashboard/home/search/searchUsersView.html'
                    },
                    navigation: {
                        templateUrl: 'components/dashboard/home/navigation/navigationView.html'
                    }
                }

            })
    }),
        module.run(function ($couchPotato) {
            module.lazy = $couchPotato;
        });
    return module;
});