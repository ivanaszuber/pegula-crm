define(['appModule'], function (appModule) {

    "use strict";

    appModule.registerController('appController', function ($scope, $location, authService, $sessionStorage, employeeService) {
        $scope.$storage = $sessionStorage;
        // Assume employee is not logged in until we hear otherwise
        $scope.authenticated = false;
        // Wait and respond to the logout event.
        $scope.$on('authService.logged_out', function () {
            $sessionStorage.$reset();
            $scope.authenticated = false;

            //Since the service data is persistent even after logout we need to
            //clear the data on logout
            //Is there a better alternative? (besides doing a full reload)
            employeeService.types = null;
        });
        // Wait and respond to the log in event.
        $scope.$on('authService.logged_in', function () {
            $scope.authenticated = true;
        });
        // If the employee attempts to access a restricted page, redirect them back to the main page.
        $scope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            console.error("Unable to change routes.  Error: ", rejection)
            $location.path('/restricted').replace();
        });
    })
});
