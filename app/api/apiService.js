/**
 * Created by Ivana on 28.5.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('apiService', function ($http, $q, $cookies) {

        /**
         * Executes a HTTP request with the provided arguments
         * and returns a promise
         * @type {{API_URL: string, request: Function}}
         */
        var apiService = {
            'API_URL': 'http://localhost:5050/api/v1',
            'request': function (args) {
                if ($cookies.token) {
                    $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
                }
                params = args.params || {}
                args = args || {};
                var deferred = $q.defer(),
                    url = this.API_URL + args.url,
                    method = args.method || "GET",
                    params = params,
                    data = args.data || {};

                $http({
                    url: url,
                    method: method.toUpperCase(),
                    data: data,
                    params: params
                })
                    .success(angular.bind(this, function (data, status) {
                        deferred.resolve(data, status);
                    }))
                    .error(angular.bind(this, function (data, status, headers, config) {
                        console.log("error syncing with: " + url);

                        if (data) {
                            data.status = status;
                        }
                        if (status == 0) {
                            if (data == "") {
                                data = {};
                                data['status'] = 0;
                                data['non_field_errors'] = ["Could not connect. Please try again."];
                            }
                            if (data == null) {
                                data = {};
                                data['status'] = 0;
                                data['non_field_errors'] = ["Server timed out. Please try again."];
                            }
                        }
                        deferred.reject(data, status, headers, config);
                    }));
                return deferred.promise;
            }
        }

        return apiService;
    })
});
