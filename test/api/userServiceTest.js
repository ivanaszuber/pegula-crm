/**
 * Created by Ivana on 12.6.2015..
 */
define([
    'userService'
], function (userService) {

    describe('userService', function () {

        beforeEach(module('appModule'));

        var ApiService, UserService, sessionStorage, q, $httpBackend, $scope, deferred, email = 'test@test.com', user;

        beforeEach(inject(function (apiService, $sessionStorage, $q, $rootScope, userService) {
            ApiService = apiService;
            UserService = userService;
            sessionStorage = $sessionStorage;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getUsers', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5050/api/v1/users')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/auth/users', function () {
                UserService.getUsers();
                $httpBackend.expectGET('http://localhost:5050/api/v1/users');
                $httpBackend.flush();
            });


            describe('getUsers request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(UserService, 'getUsers').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    UserService.getUsers();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getUser', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5050/api/v1/users/test@test.com')
                    .respond(200, {
                        "email": "test@test.com",
                        "organization": "Pegula",
                        "phone": "",
                        "roles": [
                            "admin"
                        ],
                        "status": "active",
                        "first_name": "pegula",
                        "last_name": "admin",
                        "created": "2015-06-10T04:23:36.593089Z",
                        "modified": "2015-06-10T04:23:36.593089Z"
                    });
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/auth/users', function () {
                UserService.getUser(email);
                $httpBackend.expectGET('http://localhost:5050/api/v1/users/test@test.com');
                $httpBackend.flush();
            });


            describe('getUser request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(UserService, 'getUser').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    UserService.getUser(email);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                });

                describe('getUser return value', function () {
                    beforeEach(function () {
                        deferred.resolve(user);
                        $scope.$apply();

                        it('should return the user', function () {
                            expect(user).toEqual({
                                "email": "test@test.com",
                                "organization": "Pegula",
                                "phone": "",
                                "status": "active",
                                "first_name": "Pegula",
                                "last_name": "admin",
                                "created": "2015-06-10T04:23:36.593089Z",
                                "modified": "2015-06-10T04:23:36.593089Z"
                            });
                        });


                    });
                })

            })
        });

        describe('createUser', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5050/api/v1/users')
                    .respond(200, {
                        "email": "test@test.com",
                        "organization": "Pegula",
                        "phone": "",
                        "roles": [
                            "Funding_Administrator"
                        ],
                        "status": "active",
                        "first_name": "Blackrock",
                        "last_name": "Investor",
                        "created": "2015-06-10T04:23:36.593089Z",
                        "modified": "2015-06-10T04:23:36.593089Z"
                    });
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            it('should send a POST request to api/auth/users', function () {
                UserService.createUser(user);
                $httpBackend.expectPOST('http://localhost:5050/api/v1/users');
                $httpBackend.flush();
            });


            describe('createUser request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(UserService, 'createUser').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    UserService.createUser(user);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                });

                describe('createUser return value', function () {
                    beforeEach(function () {
                        deferred.resolve(user);
                        $scope.$apply();

                        it('should create a new user', function () {
                            expect(user).toEqual({
                                "email": "test@test.com",
                                "organization": "Pegula",
                                "phone": "",
                                "roles": [
                                    "admin"
                                ],
                                "status": "active",
                                "first_name": "Pegula",
                                "last_name": "admin",
                                "created": "2015-06-10T04:23:36.593089Z",
                                "modified": "2015-06-10T04:23:36.593089Z"
                            });
                        });


                    });
                })

            })
        });

        describe('updateUser', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('PUT', 'http://localhost:5050/api/v1/users/test@test.com')
                    .respond(200, {
                        "email": "test@test.com",
                        "organization": "Pegula",
                        "phone": "",
                        "roles": [
                            "admin"
                        ],
                        "status": "active",
                        "first_name": "Pegula",
                        "last_name": "admin",
                        "created": "2015-06-10T04:23:36.593089Z",
                        "modified": "2015-06-10T04:23:36.593089Z"
                    });
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            it('should send a PUT request to api/auth/users', function () {
                UserService.updateUser(email, user);
                $httpBackend.expectPUT('http://localhost:5050/api/v1/users/test@test.com');
                $httpBackend.flush();
            });


            describe('updateUser request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(UserService, 'updateUser').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    user = {
                        "email": "test@test.com",
                        "organization": "Pegula",
                        "phone": "",
                        "roles": [
                            "admin"
                        ],
                        "status": "active",
                        "first_name": "Pegula",
                        "last_name": "admin",
                        "created": "2015-06-10T04:23:36.593089Z",
                        "modified": "2015-06-10T04:23:36.593089Z"
                    };


                    UserService.updateUser(user);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                });

                describe('updateUser return value', function () {
                    beforeEach(function () {
                        deferred.resolve(user);
                        $scope.$apply();

                        it('should update the user', function () {
                            expect(user).toEqual({
                                "email": "test@test.com",
                                "organization": "Pegula",
                                "phone": "",
                                "roles": [
                                    "admin"
                                ],
                                "status": "active",
                                "first_name": "Pegula",
                                "last_name": "admin",
                                "created": "2015-06-10T04:23:36.593089Z",
                                "modified": "2015-06-10T04:23:36.593089Z"
                            });
                        });

                    });
                })

            })
        });

        describe('deactivateUser', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('PATCH', 'http://localhost:5050/api/v1/users/test@test.com')
                    .respond(200, {
                        "email": "test@test.com",
                        "client": "Pegula",
                        "phone": "",
                        "roles": [
                            "admin"
                        ],
                        "status": "active",
                        "first_name": "Pegula",
                        "last_name": "admin",
                        "created": "2015-06-10T04:23:36.593089Z",
                        "modified": "2015-06-10T04:23:36.593089Z"
                    });
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            it('should send a PATCH request to api/auth/users', function () {
                UserService.deactivateUser(email);
                $httpBackend.expectPATCH('http://localhost:5050/api/v1/users/test@test.com');
                $httpBackend.flush();
            });


            describe('deactivateUser request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(UserService, 'deactivateUser').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);

                    deferred.resolve(user);
                    $scope.$apply();
                });

                beforeEach(function () {
                    user = {
                        "email": "test@test.com",
                        "client": "Pegula",
                        "phone": "",
                        "roles": [
                            "admin"
                        ],
                        "status": "deactivated",
                        "first_name": "Pegula",
                        "last_name": "admin",
                        "created": "2015-06-10T04:23:36.593089Z",
                        "modified": "2015-06-10T04:23:36.593089Z"
                    };
                    UserService.deactivateUser(email);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                });

                it('should deactivate the user', function () {
                    deferred.resolve(user);
                    $scope.$apply();

                    expect(user.status).toEqual('deactivated');
                });


            })

            describe('deactivateUser return value', function () {
                beforeEach(function () {
                    deferred.resolve(user);
                    $scope.$apply();

                    it('should deactivate the user', function () {
                        expect(user.status).toEqual('deactivated');
                    });

                });
            })
        });
    });

});