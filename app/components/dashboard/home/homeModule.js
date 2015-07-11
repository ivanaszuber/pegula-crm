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

    var homeModule = ng.module('homeModule', [
        'ui.router',
        'ngResource',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.bootstrap'
    ]);

    couchPotato.configureApp(homeModule);

    homeModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.home', {
                url: '/:homeType',
                views: {
                    "content@app": {
                        templateUrl: 'components/dashboard/home/homeView.html',
                        controller: 'homeController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'api/authService',
                                'api/apiService',
                                'api/userService',
                                'components/dashboard/home/homeService',
                                'components/dashboard/home/gridRow/userRowController'
                            ])
                        }
                    },

                    search: {
                        templateUrl: function ($stateParams) {
                            return 'components/dashboard/home/search/search' + $stateParams.homeType + 'View.html';
                        },
                        controllerProvider: function($stateParams) {
                            var ctrlName = "search" + $stateParams.homeType + "Controller";
                            return ctrlName;
                        }
                    },

                    navigation: {
                        templateUrl: 'components/dashboard/home/navigation/navigationView.html'
                    }

                },
                data: {
                    displayName: 'Home'
                }

            })


    });

    homeModule.run(function ($couchPotato) {
        homeModule.lazy = $couchPotato;
    });

    return homeModule;
});