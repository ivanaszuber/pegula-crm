/**
 * Created by Ivana on 1.6.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    module.registerController('userEditController', function ($scope, $state, userService, $rootScope) {

        $scope.user = {};

        /**
         * Get selected user data
         */
        userService.getUser($rootScope.selectedUser).then(function (data) {
            $scope.user = data;
        })


        /**
         * Update the selected user data, go to the Users state and
         * display a success notification
         */
        $scope.update = function () {
            userService.updateUser($rootScope.selectedUser, $scope.user).then(function () {
                $state.go('app.home', {homeType:'Users'});
                $.smallBox({
                    title: "User "+ $scope.user.first_name + ' ' + $scope.user.last_name + ' has been modified.',
                    color: "#739E73",
                    iconSmall: "fa fa-check",
                    timeout: 5000
                });
            });
        }
    })
})