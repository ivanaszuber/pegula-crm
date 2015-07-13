/**
 * Created by Ivana on 12.6.2015..
 */
define([
    'angular',
    'angular-mocks',
    'appModule'
], function (loginInfoDirective) {

    describe('loginInfoDirective', function () {
        var $httpBackend,
            scope,
            sessionStorage,
            elem, compiledElem;

        beforeEach(module('appModule'));

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', 'components/login/loginView.html')
                .respond(200);
            $httpBackend.when('GET', 'components/login/loginInfoView.html')
                .respond(200);
            $httpBackend.when('POST', 'http://localhost:5050/api/v1/login/')
                .respond(200, {success: true});
        }));

        beforeEach(inject(function ($compile, $rootScope, $sessionStorage) {
            scope = $rootScope.$new();
            sessionStorage = $sessionStorage;
            sessionStorage.user = {'email': 'test'}

            elem = angular.element('<div login-info></div>');

            compiledElem = $compile(elem)(scope);
            scope.$digest();
        }));


        it('should set the user to sessionStorage.user', function () {
            expect(compiledElem.scope()).toBeDefined();
        });
    });
})
