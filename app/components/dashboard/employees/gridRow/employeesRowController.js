/**
 * Created by Ivana on 9.6.2015..
 */
define(['appModule'], function(module){
    "use strict";

    return module.registerController('employeesRowController', function($scope, $modal, $log, employeeService, $rootScope){

        /**
         * Opens the modal with a confirmation button
         * and message
         * Upon confirmation the employee status is set to 'deactivated'
         */
        $scope.deactivateEmployee = function () {
            $modal.open({
                templateUrl: 'deactivateEmployeeView.html',
                controller: function($scope, $modalInstance){
                    $scope.deactivate = function(){
                        employeeService.deactivateEmployee($rootScope.selectedEmployee).then(function(){
                            //Getting the udated data from the server
                            employeeService.getEmployees().then(function (data) {
                                //calling the root function (set in employeeController)
                                //to update the data in the grid
                                $rootScope.setEmployeeData(data);
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