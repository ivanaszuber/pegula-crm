/**
 * Created by Ivana on 19.7.2015..
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

    var usersListModule = ng.module('usersListModule', [
        'ui.router',
        'ngResource',
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.autoResize',
        'ui.bootstrap'
    ]);

    couchPotato.configureApp(usersListModule);

    usersListModule.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.users', {
                url: '/users',
                views: {
                    "content@app": {
                        templateUrl: 'components/dashboard/users/usersListView.html',
                        controller: 'usersListController',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'components/dashboard/users/gridRow/usersRowController',
                                'components/dashboard/users/gridRow/userRowDirective'
                            ])
                        }
                    },

                    rightSidebar: {
                        templateUrl: 'components/dashboard/layout/rightSidebar/rightSidebarView.html'
                    },

                    navigation: {
                        templateUrl: 'components/dashboard/layout/navigation/navigationView.html'
                    }

                },
                data: {
                    displayName: 'Users'
                }

            })


    });

    usersListModule.run(function ($couchPotato) {
        usersListModule.lazy = $couchPotato;
    });

    return usersListModule;
});