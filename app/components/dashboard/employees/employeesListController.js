/**
 * Created by Ivana on 14.5.2015.
 */

define(['components/dashboard/employees/employeesListModule'], function (module) {
    "use strict";

    module.registerController("employeesListController", employeesListController);

    //using the implicit annotation (no array of names) and using ngAnnotate when building production code
    //see https://docs.angularjs.org/guide/di
    function employeesListController($scope, employeesListService, $rootScope, employeeService, $stateParams) {

        $scope.types = employeesListService.types; //fetch the tabs from the service

        $scope.activeTab = $stateParams.employeesType; //set the active tab to be the one from the stateParams

        $scope.isActive = function (tab) {
            return $scope.activeTab == tab; //when clicked on the tab, set the activeTab
        };

        $scope.getStatusColor = function (entity) {  //get the icon class to be used in the grid
            if (entity.status === 'Full Time') {
                return 'md md-person-outline green icon-color';
            }
            if (entity.status === 'Contract') {
                return 'md md-person-outline blue icon-color';
            }
            if (entity.status === 'Candidate') {
                return 'md md-person-outline yellow icon-color';
            }
            else {
                return 'md md-person-outline red icon-color';
            }
        };

        $scope.getFirstAndLastName = function (entity) {
            return entity.first_name + ' ' + entity.last_name;
        };

        $rootScope.setEmployeeData = function (status) {
            employeeService.getEmployees().then(function (data) {
                angular.forEach(data, function (row) {
                    row.getFirstAndLastName = function () {
                        return this.first_name + ' ' + this.last_name;
                    };
                });
                if (status !== '') { //filter the data depending on the status
                    $scope.employeeData = _.pluck(_.where(data, {'status': status}));
                } else {
                    $scope.employeeData = data;
                }
            });
        };


        /**
         * Fetches the employee data, creates the employee grid and sets the 'All' tab as the active one
         * @param tab
         */
        $scope.setTab = function (tab) {

            $scope.activeTab = tab;
            $scope.employeeData = [];

            if (tab == 'All') {
                $scope.gridEmployees = {
                    columnDefs: [
                        {
                            field: 'getFirstAndLastName()', displayName: 'Name',
                            cellTemplate: '<div class="ui-grid-cell-contents">' +
                            '<i ng-class="grid.appScope.getStatusColor(row.entity)"></i>' +
                            '<div>{{grid.appScope.getFirstAndLastName(row.entity)}}<div>' +
                            '</div>'
                        },
                        {field: 'role', displayName: 'Role'},
                        {field: 'status', displayName: 'Status', width: 120},
                        {field: 'email', displayName: 'Email'},
                        {field: 'date_from', displayName: 'Date From', cellFilter: "date:'yyyy-MM-dd'", width: 120},
                        {field: 'date_to', displayName: 'Date To', cellFilter: "date:'yyyy-MM-dd'", width: 120}
                    ],
                    data: 'employeeData',
                    rowTemplate: 'components/dashboard/employees/gridRow/employeesRowView.html'
                };

                $rootScope.setEmployeeData('');
            }

            else if (tab == 'Full-Time') {
                $scope.gridEmployees = {
                    columnDefs: [
                        {field: 'getFirstAndLastName()', displayName: 'Name'},
                        {field: 'role', displayName: 'Role'},
                        {field: 'email', displayName: 'Email'},
                        {field: 'date_from', displayName: 'Date From', cellFilter: "date:'yyyy-MM-dd'", width: 120},
                        {field: 'date_to', displayName: 'Date To', cellFilter: "date:'yyyy-MM-dd'", width: 120}
                    ],
                    data: 'employeeData',
                    rowTemplate: 'components/dashboard/employees/gridRow/employeesRowView.html'
                };

                $rootScope.setEmployeeData('Full Time');
            }

            else if (tab == 'Contract') {
                $scope.gridEmployees = {
                    columnDefs: [
                        {field: 'getFirstAndLastName()', displayName: 'Name'},
                        {field: 'role', displayName: 'Role'},
                        {field: 'email', displayName: 'Email'},
                        {field: 'date_from', displayName: 'Date From', cellFilter: "date:'yyyy-MM-dd'", width: 120},
                        {field: 'date_to', displayName: 'Date To', cellFilter: "date:'yyyy-MM-dd'", width: 120}
                    ],
                    data: 'employeeData',
                    rowTemplate: 'components/dashboard/employees/gridRow/employeesRowView.html'
                };

                $rootScope.setEmployeeData('Contract');
            }

            else if (tab == 'Candidates') {
                $scope.gridEmployees = {
                    columnDefs: [
                        {field: 'getFirstAndLastName()', displayName: 'Name'},
                        {field: 'role', displayName: 'Role'},
                        {field: 'email', displayName: 'Email'},
                        {field: 'date_from', displayName: 'Date From', cellFilter: "date:'yyyy-MM-dd'", width: 120},
                        {field: 'date_to', displayName: 'Date To', cellFilter: "date:'yyyy-MM-dd'", width: 120}
                    ],
                    data: 'employeeData',
                    rowTemplate: 'components/dashboard/employees/gridRow/employeesRowView.html'
                };

                $rootScope.setEmployeeData('Candidate');
            }

            $scope.gridEmployees.onRegisterApi = function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $rootScope.selectedEmployee = row.entity.email;
                    $rootScope.rootEmployee = row.entity;
                });
            }
        };

        $scope.setTab($stateParams.employeesType);
    }
});