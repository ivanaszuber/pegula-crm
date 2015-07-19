/**
 * Created by Ivana on 1.6.2015..
 */
define(['appModule', 'moment'], function (module, moment) {

    'use strict';

    module.registerController('employeeEditController', function ($scope, $state, employeeService, $stateParams) {

        $scope.employee = {};

        $scope.employeeRoles = [
            'Frontend Developer',
            'Backend Developer',
            'Database Administrator',
            'President',
            'CEO',
            'Managing Director',
            'Project Manager'
        ];

        $scope.employeeStatus = [
            'Full Time',
            'Contract',
            'Candidate'
        ];


        $scope.submitted = false;

        /**
         * Open the DateFrom datepicker
         * @param $event
         */
        $scope.openDateFrom = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            if (typeof($scope.mydp) === 'undefined') {
                $scope.mydp = {};
            }
            $scope.mydp.openedDateFrom = true;
        };

        /**
         * Open the DateTo datepicker
         * @param $event
         */
        $scope.openDateTo = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            if (typeof($scope.mydp) === 'undefined') {
                $scope.mydp = {};
            }
            $scope.mydp.openedDateTo = true;
        };

        /**
         * Get selected employee data
         */
        employeeService.getEmployee($stateParams.employee_id).then(function (data) {
            $scope.employee = data;
        });


        /**
         * Update the selected employee data, go to the All state and
         * display a success notification
         */
        $scope.update = function (isValid) {

            $scope.submitted = true;

            if(isValid){
                employeeService.updateEmployee($stateParams.employee_id, $scope.employee).then(function () {
                    $state.go('app.employees', {employeesType:'All'});
                    $.smallBox({
                        title: "Employee "+ $scope.employee.first_name + ' ' + $scope.employee.last_name + ' has been modified.',
                        color: "#739E73",
                        iconSmall: "fa fa-check",
                        timeout: 5000
                    });
                });
            }

        }
    })
})