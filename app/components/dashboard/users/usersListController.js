/**
 * Created by Ivana on 14.5.2015..
 */
define(['components/dashboard/users/usersListModule'], function (module) {
    "use strict";

    module.registerController("usersListController", usersListController);

    function usersListController($scope, $rootScope, userService, $sessionStorage, $stateParams) {

        $scope.gridUsers = {
            columnDefs: [
                {field: 'getFirstAndLastName()', displayName: 'Name'},
                {field: 'email', displayName: 'Email'},
                {field: 'created', displayName: 'Created Date', cellFilter: "date:'yyyy-MM-dd'", width:120},
                {field: 'status', displayName: 'Status'}
            ],
            data: 'userData',
            rowTemplate: 'components/dashboard/users/gridRow/usersRowView.html',
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

        userService.getUsers().then(function (data) {
            angular.forEach(data, function (row) {
                row.getFirstAndLastName = function () {
                    return this.first_name + ' ' + this.last_name;
                };
            });

            $scope.userData = data;

        });

        //we need a $rootScope function as this will be called from the
        //filterController to update the data
        //would be better to call a service function, but the grid doesn't refresh when it holds a reference
        //to a service property
        $rootScope.setUserData = function(data){
            angular.forEach(data, function (row) {
                row.getFirstAndLastName = function () {
                    return this.first_name + ' ' + this.last_name;
                }
            });
            $scope.userData =  _.pluck(_.where(data, {'status': 'Full Time'}));
        };

        $scope.getName = function(name){
            return name;
        };

        $scope.getColor = function(color){
            return color;
        };


        $scope.gridUsers.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $rootScope.selectedUser = row.entity.email;
                $rootScope.rootUser = row.entity;
            });
        }
    }
});