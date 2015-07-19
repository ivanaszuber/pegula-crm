/**
 * Created by Ivana on 19.7.2015..
 */
define(['appModule'], function(module){
    "use strict";

    return module.registerController('userRowController', function($scope, $modal, $log, userService, $rootScope){

        /**
         * Opens the modal with a confirmation button
         * and message
         * Upon confirmation the user status is set to 'deactivated'
         */
        $scope.deactivateUser = function () {
            $modal.open({
                templateUrl: 'deactivateUserView.html',
                controller: function($scope, $modalInstance){
                    $scope.deactivate = function(){
                        userService.deactivateUser($rootScope.selectedUser).then(function(){
                            //Getting the updated data from the server
                            userService.getUsers().then(function (data) {
                                //calling the root function (set in usersListController)
                                //to update the data in the grid
                                $rootScope.setUserData(data);
                            });
                            $modalInstance.close();
                        });
                    }

                    $scope.closeModal = function(){
                        $modalInstance.close();
                    }
                }
            });
        };


    })

});