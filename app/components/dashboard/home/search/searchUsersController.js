/**
 * Created by Ivana on 14.5.2015..
 */
define(['components/dashboard/employees/employeesListModule', 'lodash', 'moment'], function (module, _, moment) {
    "use strict";

    return module.registerController("searchUsersController", searchUsersController);

    function searchUsersController($scope, userService, $rootScope) {

        $scope.model = {
            'searchText': '',
            'userActive': false,
            'dateFrom': new Date('2015-1-1'),
            'dateTo': new Date()
        }

        $scope.activeTab = 'filter';
        $scope.userData = [];
        $scope.types = [
            {
                "title": "Search",
                "name": "filter"
            },
            {
                "title": "Activity",
                "name": "activity"
            },
            {
                "title": "Details",
                "name": "details"
            }
        ];


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
         * Get all users that match the search criteria
         * @returns {*}
         */
        $scope.getSearchTextUsers = function () {
            if ($scope.model.searchText != '') {
                return userService.searchUsers($scope.model.searchText).then(function (data) {
                    return $scope.userData = data;
                });
            } else {
                return userService.getUsers().then(function (data) {
                    return $scope.userData = data;
                })
            }
        }

        $scope.search = function () {

            $scope.getSearchTextUsers().then(function () {

                /**
                 * If the userActive checkbox is selected return only active users
                 */
                if ($scope.model.userActive) {
                    $scope.userData =  _.pluck(_.where($scope.userData, {'status': 'active'}));
                }

                /**
                 * If DateFrom is selected return only those users that were created after the selected date
                 */
                if ($scope.model.dateFrom) {
                    $scope.userData = _.filter($scope.userData, function (data) {
                        return moment(data.created) >= moment($scope.model.dateFrom);
                    });
                }

                /**
                 * If DateTo is selected return only those users that were created before the selected date
                 */
                if ($scope.model.dateTo) {
                    $scope.userData = _.filter($scope.userData, function (data) {
                        return moment(data.created) <= moment($scope.model.dateTo);
                    });
                }

                /**
                 * Set the search fields back to their defaults
                 * @type {Date}
                 */
                $scope.model.dateFrom = new Date('2015-1-1');
                $scope.model.dateTo = new Date();
                $scope.model.searchText = '';
                $scope.model.userActive = false;
                $rootScope.setUserData($scope.userData);
            })
        }

        $scope.isActive = function (tab) {
            return $scope.activeTab === tab;
        };

        $scope.setTab = function (tabType) {
            $scope.activeTab = tabType;

        };
    }
});