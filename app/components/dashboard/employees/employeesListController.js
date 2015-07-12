/**
 * Created by Ivana on 14.5.2015..
 */
define(['components/dashboard/employees/employeesListModule'], function (module) {
    "use strict";

    module.registerController("employeesListController", employeesListController);

    function employeesListController($scope, employeesListService, $rootScope, employeeService, $sessionStorage, $stateParams) {

        $scope.types = employeesListService.types;

        //Setting the state parameters
        $scope.employeesType = $stateParams.employeesType;

        $scope.activeTab = $stateParams.employeesType;
        $scope.isActive = function (tab) {
            return $scope.activeTab == tab;
        };

        /**
         * Fetches the employee data, creates the employee grid and sets the 'All' tab as the active one
         * @param tab
         */
        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
            $scope.employeeData = [];

            //When clicked on Tab All
            if (tab == 'All') {
                $scope.gridEmployees = {
                    columnDefs: [
                        {field: 'getFirstAndLastName()', displayName: 'Name',
                            cellTemplate: '<div class="ui-grid-cell-contents"><i ng-class="grid.appScope.getColor(row.entity.getStatusColor())"></i><div>{{grid.appScope.getName(row.entity.getFirstAndLastName())}}<div></div>'},
                        {field: 'role', displayName: 'Role'},
                        {field: 'status', displayName: 'Status'},
                        {field: 'email', displayName: 'Email'},
                        {field: 'date_from', displayName: 'Date From', cellFilter: "date:'yyyy-MM-dd'"},
                        {field: 'date_to', displayName: 'Date To', cellFilter: "date:'yyyy-MM-dd'"}
                    ],
                    data: 'employeeData',
                    rowTemplate: 'components/dashboard/employees/gridRow/employeesRowView.html',
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    enableHorizontalScrollbar: false,
                    enableVerticalScrollbar: false,
                    enableFiltering:true,
                    headerRowHeight:50,
                    rowHeight:50
                };

                employeeService.getEmployees().then(function (data) {
                    angular.forEach(data, function (row) {
                        row.getFirstAndLastName = function () {
                            return this.first_name + ' ' + this.last_name;
                        };

                        row.getStatusColor = function () {
                            if (this.status === 'Full Time') {
                                return 'md md-person-outline green icon-color';
                            } if (this.status === 'Contract') {
                                return 'md md-person-outline blue icon-color';
                            } if (this.status === 'Candidate') {
                                return 'md md-person-outline yellow icon-color';
                            }
                            else {
                                return 'md md-person-outline red icon-color';
                            };
                        }
                    });

                    $scope.employeeData =  data;

                });

                //we need a $rootScope function as this will be called from the
                //filterController to update the data
                //would be better to call a service function, but the grid doesn't refresh when it holds a reference
                //to a service property
                $rootScope.setEmployeeData = function(data){
                    angular.forEach(data, function (row) {
                        row.getFirstAndLastName = function () {
                            return this.first_name + ' ' + this.last_name;
                        }
                    });
                    $scope.employeeData =  data;
                };

                $scope.getName = function(name){
                    return name;
                };

                $scope.getColor = function(color){
                    return color;
                };


                $scope.gridEmployees.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        $rootScope.selectedEmployee = row.entity.email;
                        $rootScope.rootEmployee = row.entity;
                    });
                }

            }
        };


        $scope.setTab($stateParams.employeesType);
    }
});