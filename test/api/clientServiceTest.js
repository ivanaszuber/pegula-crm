/**
 * Created by Ivana on 12.6.2015..
 */
define([
    'clientService'
], function (clientService) {

    describe('clientService', function () {

        beforeEach(module('appModule'));

        var ApiService, ClientService, sessionStorage, q, $httpBackend, $scope, deferred, org_id = 'Pegula', client;

        beforeEach(inject(function (apiService, $sessionStorage, $q, $rootScope, clientService) {
            ApiService = apiService;
            ClientService = clientService;
            sessionStorage = $sessionStorage;
            $scope = $rootScope.$new();
            q = $q
        }));


        describe('getClients', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5050/api/v1/clients')
                    .respond(200, {success: true});
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/auth/clients', function () {
                ClientService.getClients();
                $httpBackend.expectGET('http://localhost:5050/api/v1/clients');
                $httpBackend.flush();
            });


            describe('getClients request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ClientService, 'getClients').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    ClientService.getClients();
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    $httpBackend.flush();
                });

            })
        });

        describe('getClient', function () {
            beforeEach(inject(function ($injector) {
                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://localhost:5050/api/v1/clients/Pegula')
                    .respond(200, {
                        "org_id": "Pegula",
                        "created": "2015-06-10T04:19:35.919495Z",
                        "modified": "2015-06-10T04:19:35.919495Z",
                        "name": "Pegula",
                        "org_type": "admin"
                    });
                $httpBackend.when('GET', 'components/login/loginView.html')
                    .respond(200);
            }));

            it('should send a GET request to api/auth/clients', function () {
                ClientService.getClient(org_id);
                $httpBackend.expectGET('http://localhost:5050/api/v1/clients/Pegula');
                $httpBackend.flush();
            });


            describe('getClient request chain', function () {
                beforeEach(function () {
                    deferred = q.defer();

                    spyOn(ClientService, 'getClient').and.callThrough();
                    spyOn(ApiService, 'request').and.returnValue(deferred.promise);
                });

                beforeEach(function () {
                    ClientService.getClient(org_id);
                });


                it('should call apiService.request', function () {
                    expect(ApiService.request).toHaveBeenCalled();
                    deferred.resolve(client);
                    $scope.$apply();
                });

            })
        });

    });

});