define(['appModule'], function (appModule) {

    "use strict";

    appModule.registerController('appController', function ($scope, $location, authService, $sessionStorage) {
        $scope.$storage = $sessionStorage;
        // Assume user is not logged in until we hear otherwise
        $scope.authenticated = false;
        // Wait and respond to the logout event.
        $scope.$on('authService.logged_out', function () {
            $sessionStorage.$reset();
            $scope.authenticated = false;
        });
        // Wait and respond to the log in event.
        $scope.$on('authService.logged_in', function () {
            $scope.authenticated = true;
        });
        // If the user attempts to access a restricted page, redirect them back to the main page.
        $scope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            console.error("Unable to change routes.  Error: ", rejection)
            $location.path('/restricted').replace();
        });
    })
});
