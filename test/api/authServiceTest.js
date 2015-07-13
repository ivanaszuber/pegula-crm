/**
 * Created by Ivana on 12.6.2015..
 */
define([
    'authService'
], function (authService) {

    describe('authService', function () {

        beforeEach(module('appModule'));

        var AuthService, sessionStorage, q, $httpBackend, $scope, deferred, email = 'test@test.com';

        beforeEach(inject(function (authService, $sessionStorage,$q, $rootScope) {
            AuthService = authService;
            sessionStorage = $sessionStorage;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('User Login', function(){
            beforeEach(inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5050/api/rest-auth/login/')
                    .respond(200, {email: email, success: true});
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            beforeEach(function() {
                AuthService.login(email, 1);
            });

            it('should send a login POST request to the rest-auth API', function() {
                $httpBackend.expectPOST('http://localhost:5050/api/rest-auth/login/')
                    .respond(200, {email: email, success: true});;
                $httpBackend.flush();
            });


            describe('User login request chain', function(){
                beforeEach(function() {
                    deferred = q.defer();

                    spyOn(AuthService,'login').and.callThrough();
                    spyOn(AuthService,'request').and.returnValue(deferred.promise);

                    spyOn(deferred.promise, 'then').and.callThrough();
                });

                beforeEach(function() {
                    AuthService.login(email, 1);
                });


                it('should call request', function() {
                    expect(AuthService.request).toHaveBeenCalled();
                });


                it('should call the then function of the request', function () {
                    expect(deferred.promise.then).toHaveBeenCalled();
                });

                describe('User login then', function() {
                    var testData = {};

                    beforeEach(function() {
                        deferred.resolve(testData);
                        $scope.$apply(); // Forces $q.promise then callbacks to be called
                    });

                    it('should set authenticated value to true ', function () {
                        expect(AuthService.authenticated).toBeTruthy();
                    });

                    it('should set the sessionStorage email', function() {
                        expect(sessionStorage.email).toEqual(email)
                    });
                });
            })
        });


        describe('User Logout', function(){
            beforeEach(inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('POST', 'http://localhost:5050/api/rest-auth/logout/')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            beforeEach(function() {
                AuthService.logout();
            });

            it('should send a logout POST request to the rest-auth API', function() {
                $httpBackend.expectPOST('http://localhost:5050/api/rest-auth/logout/');
                $httpBackend.flush();
            });

            describe('User logout request chain', function(){
                beforeEach(function() {
                    deferred = q.defer();

                    spyOn(AuthService,'logout').and.callThrough();
                    spyOn(AuthService,'request').and.returnValue(deferred.promise);

                    spyOn(deferred.promise, 'then').and.callThrough();
                });

                beforeEach(function() {
                    AuthService.logout();
                });


                it('should call request', function() {
                    expect(AuthService.request).toHaveBeenCalled();
                });


                it('should call the then function of the request', function () {
                    expect(deferred.promise.then).toHaveBeenCalled();
                });

                describe('User logout then', function() {
                    var testData = {};

                    beforeEach(function() {
                        deferred.resolve(testData);
                        $scope.$apply(); // Forces $q.promise then callbacks to be called
                    });

                    it('should set authenticated value to false ', function () {
                        expect(AuthService.authenticated).toBeFalsy();
                    });
                });
            })
        });

    });
});