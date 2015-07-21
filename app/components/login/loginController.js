/**
 * Created by Ivana on 20.5.2015..
 */
define(['components/login/loginModule'], function (module) {

    "use strict";

    module.registerController('loginController', function ($scope, $state, $location, authService, userService, $sessionStorage, $timeout) {

        $scope.model = {'email': '', 'password': ''};

        $scope.login = function () {
            $scope.errors = [];

            /**
             * Login in the user with the provided email and password
             * Then store the user in $sessionStorage
             * to be used throughout the app
             */
            authService.login($scope.model.email, $scope.model.password)
                .then(function () {
                    $scope.user = function () {
                        return userService.getUser($sessionStorage.email).then(function (data) {
                            $sessionStorage.user = data;
                        });
                    };


                    /**
                     * Once the user has logged in and there was enough time to store the data in $sessionStorage
                     * go to the app.employees state and set the active tab to All
                     */
                    $scope.goHome = function(){
                        //We need to put this in a timeout, otherwise $localStorage won't have time to write the data
                        //This needs to be refactored, as even a timeout of 500 is sometimes not enough
                        ($timeout(function () {
                            $state.go('app.employees', {employeesType: 'All'});
                        }), 1000);
                    };


                    //Making sure promises are resolved in this order.
                    $scope.user().then($scope.goHome);


                }, function (data) {
                    $scope.errors = data;
                });

        }
    })
});