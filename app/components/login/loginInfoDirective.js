/**
 * Created by Ivana on 22.5.2015..
 */
define(['appModule'], function(module){
    "use strict";

    return module.registerDirective('loginInfo', function($sessionStorage ){

        /**
         * Used to display the small dropdown with employee email
         * and login/reset password options
         */
        return {
            restrict: 'A',
            templateUrl: 'components/login/loginInfoView.html',
            link: function(scope){
                scope.user = $sessionStorage.user ;
            }
        }
    })
});
