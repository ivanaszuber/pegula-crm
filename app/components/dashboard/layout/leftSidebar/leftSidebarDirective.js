/**
 * Created by Ivana on 4.6.2015..
 */
define(['appModule'], function (module) {
        "use strict";

        return module.directive('leftSidebar', function ($sessionStorage, $compile, $state) {

                /**
                 * For each element id checks the appropriate permissions
                 * and based on logged in user's permissions hides/shows the element
                 */
                return {
                    restrict: 'A',
                    link: function (scope, element) {
                        scope.userRoles = $sessionStorage.user.roles;
                        scope.org_type = $sessionStorage.client.org_type;

                    }
                };
            }
        )
    }
);