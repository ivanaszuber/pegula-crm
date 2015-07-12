define(['appModule'], function (module) {

    'use strict';
    module.service('authService', function authService($q, $http, $cookies, $rootScope, $sessionStorage) {

        var authService = {

            'API_URL': 'http://localhost:5050/api/rest-auth',
            'use_session': false,
            'authenticated': null,
            'authPromise': null,

            /**
             * Executes a HTTP request with the provided arguments
             * and returns a promise
             * @param args
             * @returns {*}
             */
            'request': function (args) {
                params = args.params || {}
                args = args || {};
                var deferred = $q.defer(),
                    url = this.API_URL + args.url,
                    method = args.method || "GET",
                    params = params,
                    data = args.data || {};

                $http({
                    url: url,
                    withCredentials: this.use_session,
                    method: method.toUpperCase(),
                    headers: {'X-CSRFToken': $cookies['csrftoken']},
                    params: params,
                    data: data
                })
                    .success(angular.bind(this, function (data, status, headers, config) {
                        deferred.resolve(data, status);
                    }))
                    .error(angular.bind(this, function (data, status, headers, config) {
                        console.log("error syncing with: " + url);

                        // Set request status
                        if (data) {
                            data.status = status;
                        }
                        if (status == 0) {
                            if (data == "") {
                                data = {};
                                data['status'] = 0;
                                data['non_field_errors'] = ["Could not connect. Please try again."];
                            }
                            // or if the data is null, then there was a timeout.
                            if (data == null) {
                                // Inject a non field error alerting the employee
                                // that there's been a timeout error.
                                data = {};
                                data['status'] = 0;
                                data['non_field_errors'] = ["Server timed out. Please try again."];
                            }
                        }
                        deferred.reject(data, status, headers, config);
                    }));
                return deferred.promise;
            },

            /**
             * Logs in the employee with the provided email and password
             * and broadcasts the success message to be used by appController
             * @param email
             * @param password
             * @returns {*}
             */
            'login': function (email, password) {
                var authService = this;
                return this.request({
                    'method': "POST",
                    'url': "/login/",
                    'data': {
                        'email': email,
                        'password': password
                    }
                }).then(function (data) {
                    if (!authService.use_session) {
                        $http.defaults.headers.common.Authorization = 'Token ' + data.token;
                        $cookies.token = data.token;
                    }
                    authService.authenticated = true;
                    $sessionStorage.email = email;
                    $rootScope.$broadcast("authService.logged_in", data);
                });
            },

            /**
             * Logs the employee out of the system and broadcasts the sucess message
             * to be used by appController
             * @returns {*}
             */
            'logout': function () {
                var authService = this;
                return this.request({
                    'method': "POST",
                    'url': "/logout/"
                }).then(function (data) {
                    delete $http.defaults.headers.common.Authorization;
                    delete $cookies.token;
                    authService.authenticated = false;
                    $rootScope.$broadcast("authService.logged_out");
                });
            },

            /**
             * Resets the employee password
             * @param old_password
             * @param new_password1
             * @param new_password2
             * @returns {*}
             */
            'resetPassword': function (old_password, new_password1, new_password2) {
                return this.request({
                    'method': 'POST',
                    'url': '/password/change/',
                    'data': {
                        'old_password': old_password,
                        'new_password1': new_password1,
                        'new_password2': new_password2
                    }
                })
            },

            /**
             * Verifies if the employee is authorized in the system
             * @param restrict
             * @param force
             * @returns {*}
             */
            'authenticationStatus': function (restrict, force) {
                // Set restrict to true to reject the promise if not logged in
                // Set to false or omit to resolve when status is known
                // Set force to true to ignore stored value and query API
                restrict = restrict || false;
                force = force || false;
                if (this.authPromise == null || force) {
                    this.authPromise = this.request({
                        'method': "GET",
                        'url': "/employee/"
                    })
                }
                var da = this;
                var getAuthStatus = $q.defer();
                if (this.authenticated != null && !force) {
                    // We have a stored value which means we can pass it back right away.
                    if (this.authenticated == false && restrict) {
                        getAuthStatus.reject("User is not logged in.");
                    } else {
                        getAuthStatus.resolve();
                    }
                } else {
                    // There isn't a stored value, or we're forcing a request back to
                    // the API to get the authentication status.
                    this.authPromise.then(function () {
                        da.authenticated = true;
                        getAuthStatus.resolve();
                    }, function () {
                        da.authenticated = false;
                        if (restrict) {
                            getAuthStatus.reject("User is not logged in.");
                        } else {
                            getAuthStatus.resolve();
                        }
                    });
                }
                return getAuthStatus.promise;
            },


            'initialize': function (url, sessions) {
                this.API_URL = url;
                this.use_session = sessions;
                return this.authenticationStatus();
            }

        }
        return authService;
    })
});
