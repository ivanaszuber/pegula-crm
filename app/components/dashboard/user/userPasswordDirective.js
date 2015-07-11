/**
 * Created by Ivana on 7.6.2015..
 */
define(['appModule'], function (module) {
    "use strict";

    return module.registerDirective('userPassword', function userPassword ($parse) {

        /**
         * Check if the comparePassword matches password
         */
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl) {
                if(!ctrl) {
                    if(console && console.warn){
                        console.warn('userPassword validation requires ngModel to be on the element');
                    }
                    return;
                }

                var userPasswordGetter = $parse(attrs.userPassword);

                scope.$watch(getuserPasswordValue, function(){
                    ctrl.$$parseAndValidate();
                });

                ctrl.$validators.userPassword = function(){
                    var userPassword = getuserPasswordValue();
                    if(angular.isString(userPassword) && angular.isString(ctrl.$viewValue)){
                        return ctrl.$viewValue.toLowerCase() === userPassword.toLowerCase();
                    }
                    return ctrl.$viewValue === userPassword;
                };

                function getuserPasswordValue(){
                    var userPassword = userPasswordGetter(scope);
                    if(angular.isObject(userPassword) && userPassword.hasOwnProperty('$viewValue')){
                        userPassword = userPassword.$viewValue;
                    }
                    return userPassword;
                }
            }
        };})
});
