/**
 * Created by Ivana on 1.6.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    module.registerController('employeeEditController', function ($scope, $state, userService, $rootScope) {

        $scope.employee = {};

        /**
         * Get selected employee data
         */
        userService.getUser($rootScope.selectedUser).then(function (data) {
            $scope.employee = data;
        })


        /**
         * Update the selected employee data, go to the All state and
         * display a success notification
         */
        $scope.update = function () {
            userService.updateUser($rootScope.selectedUser, $scope.employee).then(function () {
                $state.go('app.employees', {employeesType:'All'});
                $.smallBox({
                    title: "User "+ $scope.employee.first_name + ' ' + $scope.employee.last_name + ' has been modified.',
                    color: "#739E73",
                    iconSmall: "fa fa-check",
                    timeout: 5000
                });
            });
        }
    })
})