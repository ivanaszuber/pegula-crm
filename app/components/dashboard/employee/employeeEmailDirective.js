/**
 * Created by Ivana on 7.6.2015..
 */
define(['appModule'], function (module) {
    "use strict";

    return module.registerDirective('userEmail', function ($rootScope, $sessionStorage, $q, $http) {

        /**
         * Check if the provided email is already used
         * by another employee in the system. If it is display the appropriate
         * error message
         */
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: { },
            link: function (scope, elm, attrs, ctrl, ngModel) {

                ctrl.$asyncValidators.email = function (modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();
                    var value = modelValue || viewValue;

                    $http({
                        url: 'http://localhost:5050/api/v1/users/' + value,
                        method: 'GET'
                    })
                        .success(angular.bind(this, function () {
                            def.reject();
                        }))
                        .error(angular.bind(this, function () {
                            def.resolve();
                        }));

                    return def.promise;
                };
            }
        };
    })
});
