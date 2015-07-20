/**
 * Created by Ivana on 1.6.2015..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('userNewController', function ($scope, $state, userService, $sessionStorage) {

        $scope.submitted = false;

        $scope.user = {
            'first_name': '',
            'last_name': '',
            'email': '',
            'roles': [],
            'phone': '',
            'client': "admin"
        };

        $scope.userRoles = ["Administrator",
            "Project Manager",
            "Organization Manager",
            "Employee Manager"]


        /**
         * Create a new user with the provided data
         * Set the submitted property to true to validate the form and display any errors
         * On success go to the Users state and display the notification
         * @param isValid
         */
        $scope.create = function (isValid) {

            $scope.submitted = true;

            if (isValid) {
                userService.createUser($scope.user).then(function () {
                    $state.go('app.users', {usersType: 'All'});
                    $.smallBox({
                        title: "New user " + $scope.user.first_name + ' ' + $scope.user.last_name + ' has been created.',
                        color: "#739E73",
                        iconSmall: "fa fa-check",
                        timeout: 5000
                    });
                });
            }
        }

    })
})
;