/**
 * Created by Ivana on 13.6.2015..
 */
define([
    'resetPasswordController'

], function (resetPasswordController) {

    describe('resetPasswordController', function () {

        /**
         * We have to load the couchPotato module on which other modules depend
         * and also the appModule which loads all services we need
         */
        beforeEach(module('scs.couch-potato'));
        beforeEach(module('appModule'));


        var scope, $httpBackend, AuthService, $timeout, state, $q, deferred;

        /**
         * Injecting the dependencies
         */
        beforeEach(inject(function ($controller, authService, $rootScope, $state) {
            AuthService = authService;
            scope = $rootScope.$new();
            state = $state;
            ctrl = $controller('resetPasswordController', {
                $scope: scope
            });
        }));

        /**
         * Mocking http service responses
         */
        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $timeout = $injector.get('$timeout');
            $q = $injector.get('$q');
            $httpBackend.when('POST', 'http://localhost:5050/api/rest-auth/password/change/')
                .respond(200, {success: true});
            $httpBackend.when('GET', 'components/login/loginView.html')
                .respond(200, {success: true});

        }));

        beforeEach(function() {
            scope.old_password  ='test1';
            scope.new_password1  ='test2';
            scope.new_password2  ='test2';
            scope.resetPassword(true);
        });

        it('should have passwords defined', function () {
            expect(scope.old_password).toBeDefined();
            expect(scope.new_password1).toBeDefined();
            expect(scope.new_password2).toBeDefined();
        });

        it('should successfully reset the user password', function () {
            $httpBackend.expectPOST('http://localhost:5050/api/rest-auth/password/change/');
        });


        describe('scope.resetPassword()', function(){
            beforeEach(function() {
                deferred = $q.defer();

                /**
                 * Creating mock spies to test promises
                 */
                spyOn(scope,'resetPassword').and.callThrough();
                spyOn(AuthService,'resetPassword').and.returnValue(deferred.promise);
                spyOn(state, 'go');
                spyOn($, 'smallBox');

                spyOn(deferred.promise, 'then').and.callThrough();
            });

            beforeEach(function() {
                scope.resetPassword(true);
            });


            it('should call AuthService.resetPassword', function() {
                expect(AuthService.resetPassword).toHaveBeenCalled();
            });


            it('should call the then function of the request', function () {
                expect(deferred.promise.then).toHaveBeenCalled();
            });

            describe('After resetting the password', function() {
                var testData = {};

                beforeEach(function() {
                    deferred.resolve(testData);
                    scope.$digest();
                });

                it('should go to the browse page', function() {
                    expect(state.go).toHaveBeenCalledWith('app.employees', {employeesType: 'All'});
                });

                it('should display the notification box', function() {
                    expect($.smallBox).toHaveBeenCalledWith({
                        title: "User password has been reset.",
                        color: "#739E73",
                        iconSmall: "fa fa-check",
                        timeout: 5000
                    });
                });
            });
        })

    });
});