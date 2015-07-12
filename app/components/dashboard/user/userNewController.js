/**
 * Created by Ivana on 1.6.2015..
 */
define(['appModule'], function (module) {

    "use strict";

    module.registerController('userNewController', function ($scope, $state, organizationService, userService, rolesService, $sessionStorage) {

        $scope.userRoles = $sessionStorage.user.organization;
        $scope.submitted = false;

        /**
         * Get all roles that can be assigned to the user in the current organization
         * @param organization
         */
        $scope.getRoles = function (organization) {
            organizationService.getOrganization(organization)
                .then(function (organization) {
                    return rolesService.getRoles(organization.org_type)
                })
                .then(function (roles) {
                    $scope.user = {
                        'first_name': '',
                        'last_name': '',
                        'email': '',
                        'roles': [],
                        'phone': '',
                        'organization': organization
                    };
                    $scope.userRoles = roles;
                })
        }


        $scope.getRoles($sessionStorage.user.organization);


        /**
         * Create a new user with the provided data
         * Set the submitted property to true to validate the form and display any errors
         * On success go to the Users state and display the notification
         * @param isValid
         */
        $scope.create = function (isValid) {

            $scope.submitted = true;

            if (isValid) {
                userService.createUser($scope.user).then(function () {
                    $state.go('app.browse', {browseType: 'Users'});
                    $.smallBox({
                        title: "New user " + $scope.user.first_name + ' ' + $scope.user.last_name + ' has been created.',
                        color: "#739E73",
                        iconSmall: "fa fa-check",
                        timeout: 5000
                    });
                });
            }
        }

    })
})
;