/**
 * Created by Ivana on 9.6.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    module.registerController('resetPasswordController', function ($scope, $state, authService) {

        $scope.old_password  ='';
        $scope.new_password1  ='';
        $scope.new_password2  ='';
        $scope.submitted = false;

        /**
         * Checks if the submitted password is valid and calls the authService function to
         * reset the user password
         * Displays a notification
         * @param isValid
         */
        $scope.resetPassword = function (isValid) {
            $scope.submitted = true;

            if (isValid){
                authService.resetPassword($scope.old_password, $scope.new_password1, $scope.new_password2).then(function () {
                    $state.go('app.home', {homeType:'Users'});
                    $.smallBox({
                        title: "User password has been reset.",
                        color: "#739E73",
                        iconSmall: "fa fa-check",
                        timeout: 5000
                    });
                });
            }

        }


    })
})