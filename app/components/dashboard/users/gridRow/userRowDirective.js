/**
 * Created by Ivana on 19.7.2015..
 */

define(['appModule'], function (module) {
        "use strict";

        return module.directive('userRow', function ($state, $rootScope) {

                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        element.on('click', function () {
                            $state.go('app.editUser', {user_id: $rootScope.selectedUser})
                        })
                    }
                };
            }
        )
    }
);