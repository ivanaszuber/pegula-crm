/**
 * Created by Ivana on 10.6.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('rolesService', function ($sessionStorage, apiService) {

        var rolesService = {

            /**
             * Gets all user roles in the system that can be assigned
             * to the user belonging to the provided org_type
             * and returns a promise
             * @returns {*}
             */
            'getRoles': function () {
                return apiService.request({
                    'method': "GET",
                    'url': "/roles/" + $sessionStorage.client.org_type
                });
            }
        }

        return rolesService;
    })
});
