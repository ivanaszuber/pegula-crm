/**
 * Created by Ivana on 1.6.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    module.registerController('employeeEditController', function ($scope, $state, employeeService, $rootScope) {

        $scope.employee = {};

        /**
         * Get selected employee data
         */
        employeeService.getEmployee($rootScope.selectedEmployee).then(function (data) {
            $scope.employee = data;
        })


        /**
         * Update the selected employee data, go to the All state and
         * display a success notification
         */
        $scope.update = function () {
            employeeService.updateEmployee($rootScope.selectedEmployee, $scope.employee).then(function () {
                $state.go('app.employees', {employeesType:'All'});
                $.smallBox({
                    title: "Employee "+ $scope.employee.first_name + ' ' + $scope.employee.last_name + ' has been modified.',
                    color: "#739E73",
                    iconSmall: "fa fa-check",
                    timeout: 5000
                });
            });
        }
    })
})