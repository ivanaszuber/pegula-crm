/**
 * Created by Ivana on 12.6.2015..
 */
define([
    'loginController'
], function (loginController, appModule) {

    describe('loginController', function () {

        /**
         * We have to load the couchPotato module on which other modules depend
         * and also the appModule which loads all services we need
         */
        beforeEach(module('scs.couch-potato'));
        beforeEach(module('loginModule'));
        beforeEach(module('appModule'));


        var scope, $httpBackend, sessionStorage, AuthService, UserService, $timeout, state, $q;

        /**
         * Injecting the dependencies
         */
        beforeEach(inject(function ($controller, authService, userService) {
            scope = {};
            sessionStorage = {};
            AuthService = {};
            UserService = {};
            state = {};
            ctrl = $controller('loginController', {
                $scope: scope,
                $sessionStorage: sessionStorage,
                $state: state,
                AuthService: authService,
                UserService: userService
            });
        }));

        /**
         * Mocking http service responses
         */
        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $timeout = $injector.get('$timeout');
            $q = $injector.get('$q');
            $httpBackend.when('POST', 'http://localhost:5050/api/rest-auth/login/')
                .respond(200, {success: true});
            $httpBackend.when('GET', 'components/login/loginView.html')
                .respond(200, {success: true});
            $httpBackend.when('GET', 'http://localhost:5050/api/v1/users/test@test.com')
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
            $httpBackend.when('GET', 'http://localhost:5050/api/v1/clients/Pegula')
                .respond(200, {
                    "org_id": "Pegula",
                    "created": "2015-06-10T04:19:35.919495Z",
                    "modified": "2015-06-10T04:19:35.919495Z",
                    "name": "Pegula",
                    "org_type": "admin"
                });

        }));

        beforeEach(function() {
            scope.model = {
                'email': 'test@test.com',
                'password': 'test'
            };

            sessionStorage.email = 'test@test.com';

            scope.login(scope.model.email, scope.model.password);
        });

        it('should have a model defined', function () {
            expect(scope.model).toBeDefined();
        });

        it('should successfully log in the user', function () {
            $httpBackend.expectPOST('http://localhost:5050/api/rest-auth/login/');
            $httpBackend.flush();
        });

        it('should set the sessionStorage.user to user', function () {
            $httpBackend.expectGET('http://localhost:5050/api/v1/users/test@test.com');
            $httpBackend.flush();

            expect(sessionStorage.user).toEqual({
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
        });

    });
});