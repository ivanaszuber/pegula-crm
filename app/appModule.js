'use strict';

define([

    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-cookies',
    'angular-resource',
    'angular-animate',
    'angular-bootstrap',
    'ui.grid',
    'ngStorage',
    'angular-sanitize',
    'checklist-model'
], function (ng, couchPotato) {

    var appModule = ng.module('appModule', [
        'scs.couch-potato',
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'ngResource',
        'ui.grid',
        'ngStorage',
        'checklist-model',

        'loginModule',
        'dashboardModule',
        'homeModule',
        'userModule'
    ]);

    couchPotato.configureApp(appModule);

    appModule.config(function ($provide, $httpProvider) {

        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q) {
            var errorCounter = 0;
            function notifyError(rejection){
                console.log(rejection);

                //we don't want to show the error message when hitting backend for verification purposes
                if(rejection.status != 404 && rejection.status !=0)
                {
                    $.smallBox({
                        title: rejection.status + ' ' + rejection.statusText,
                        color: "#F36B21",
                        iconSmall: "fa fa-warning",
                        number: ++errorCounter,
                        timeout: 3000
                    });
                }

            }

            return {
                // On request failure
                requestError: function (rejection) {

                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function (rejection) {
                    // show notification
                    notifyError(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');
    });

    appModule.run(function ($couchPotato, $rootScope, $state, $stateParams) {
        appModule.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });


    return appModule;
});
