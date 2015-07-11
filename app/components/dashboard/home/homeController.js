/**
 * Created by Ivana on 14.5.2015..
 */
define(['components/dashboard/home/homeModule'], function (module) {
    "use strict";

    module.registerController("homeController", homeController);

    function homeController($scope, homeService, $rootScope, userService, $sessionStorage, $stateParams) {

        $scope.types = homeService.types;

        //Setting the state parameters
        $scope.homeType = $stateParams.homeType;

        $scope.activeTab = $stateParams.homeType;
        $scope.isActive = function (tab) {
            return $scope.activeTab == tab;
        };

        /**
         * Fetches the user data, creates the user grid and sets the 'Users' tab as the active one
         * @param tab
         */
        $scope.setTab = function (tab) {
            $scope.activeTab = tab;
            $scope.userData = [];

            //When clicked on Tab Users
            if (tab == 'Users') {
                $scope.gridUsers = {
                    columnDefs: [{field: 'getFirstAndLastName()', displayName: 'Name'},
                        {field: 'email', displayName: 'Email'},
                        {field: 'created', displayName: 'Created Date', cellFilter: "date:'yyyy-MM-dd'"},
                        {field: 'status', displayName: 'Status',
                            cellClass: function (grid, row, col, rowIndex, colIndex) {

                                //if the user status is 'deactivated' set the .deactivated CSS class
                                var val = grid.getCellValue(row, col);
                                if (val === 'deactivated') {
                                    return 'deactivated';
                                }
                                else {
                                    return 'activated';
                                }
                            }}],
                    data: 'userData',
                    rowTemplate: 'components/dashboard/home/gridRow/userRowView.html',
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    enableHorizontalScrollbar: false,
                    enableVerticalScrollbar: false
                };

                userService.getUsers().then(function (data) {
                    angular.forEach(data, function (row) {
                        row.getFirstAndLastName = function () {
                            return this.first_name + ' ' + this.last_name;
                        }
                    });

                    $scope.userData =  _.pluck(_.where(data, {'client': $sessionStorage.user.client}));

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
                    $scope.userData =  _.pluck(_.where(data, {'client': $sessionStorage.user.client}));
                };

                $scope.gridUsers.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                        $rootScope.selectedUser = row.entity.email;
                        $rootScope.rootUser = row.entity;
                    });
                }

            }
        };


        $scope.setTab($stateParams.homeType);
    }
});