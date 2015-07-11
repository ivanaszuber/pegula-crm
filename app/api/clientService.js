/**
 * Created by Ivana on 10.6.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('clientService', function ($http, $q, $cookies, $sessionStorage, apiService) {

        var clientService = {

            /**
             * Gets the clients that matches the provided org_id
             * and returns a promise
             * @param org_id
             * @returns {*}
             */
            'getClient': function (org_id) {
                return apiService.request({
                    'method': "GET",
                    'url': "/clients/" + org_id
                })
            },

            /**
             * Gets all clients in the system
             * and returns a promise
             * @returns {*}
             */
            'getClients': function () {
                return apiService.request({
                    'method': 'GET',
                    'url': '/clients'
                })
            },

            /**
             * Gets the org_type of the clients that matches
             * the provided org_id and returns a promise
             * @param org_id
             */
            'getOrgType': function (org_id) {
                var apiService = this;
                apiService.request({
                    'method': "GET",
                    'url': "/clients/" + org_id
                }).then(function (data) {
                    return data.org_type;
                })
            }
        }

        return clientService;
    })
});
