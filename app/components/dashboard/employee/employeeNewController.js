/**
 * Created by Ivana on 1.6.2015..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('employeeNewController', function ($scope, $state, employeeService) {

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
         * Create a new employee with the provided data
         * Set the submitted property to true to validate the form and display any errors
         * On success go to the All state and display the notification
         * @param isValid
         */
        $scope.create = function (isValid) {

            $scope.submitted = true;

            if (isValid) {
                employeeService.createEmployee($scope.employee).then(function () {
                    $state.go('app.employees', {employeesType: 'All'});
                    $.smallBox({
                        title: "New employee " + $scope.employee.first_name + ' ' + $scope.employee.last_name + ' has been created.',
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