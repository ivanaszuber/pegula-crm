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

                        for (var i = 0; i < scope.userRoles.length; i++) {

                            //If the element is 'employee' check to see if the user has permissions to see it
                            if (element.attr('id') == 'employee') {
                                //Permissions and requirements for creating a new funding association
                                if ($.inArray('Employee Manager', scope.userRoles) > -1) {
                                    element.show();

                                    //We need to set the state transition here because we cannot add directives (ui-sref) to the element
                                    //that is currently being compiled
                                    element.on('click', function () {
                                        $state.go('app.newEmployee')
                                    })
                                } else {
                                    element.hide();
                                }
                            }


                            //If the element is 'user' check to see if the user has permissions to see it
                            if (element.attr('id') == 'user') {
                                if ($.inArray('Administrator', scope.userRoles) > -1) {
                                    element.show();
                                    element.on('click', function () {
                                        $state.go('app.newUser')
                                    })
                                } else {
                                    element.hide();
                                }
                            }


                            //If the element is 'organization' check to see if the user has permissions to see it
                            if (element.attr('id') == 'organization') {
                                if ($.inArray('Organization Manager', scope.userRoles) > -1) {
                                    element.show();
                                    element.on('click', function () {
                                        $state.go('app.newOrganization')
                                    })
                                } else {
                                    element.hide();
                                }
                            }

                            //If the element is 'project' check to see if the user has permissions to see it
                            if (element.attr('id') == 'project') {
                                if ($.inArray('Project Manager', scope.userRoles) > -1) {
                                    element.show();
                                    element.on('click', function () {
                                        $state.go('app.newProject')
                                    })
                                } else {
                                    element.hide();
                                }
                            }
                        }

                        //If the element is 'users' check to see if the user has permissions to see it
                        if (element.attr('id') == 'users') {
                            //Permissions and requirements for creating a new funding association
                            if (($.inArray('Administrator', scope.userRoles) > -1)) {
                                element.show();

                                //We need to set the state transition here because we cannot add directives (ui-sref) to the element
                                //that is currently being compiled
                                element.on('click', function () {
                                    $state.go('app.users')
                                })
                            } else {
                                element.hide();
                            }
                        }

                        //If the element is 'employees' check to see if the user has permissions to see it
                        if (element.attr('id') == 'employees') {
                            //Permissions and requirements for creating a new funding association
                            if (($.inArray('Employee Manager', scope.userRoles) > -1)) {
                                element.show();

                                //We need to set the state transition here because we cannot add directives (ui-sref) to the element
                                //that is currently being compiled
                                element.on('click', function () {
                                    $state.go('app.employees', {employeeType: 'All'})
                                })
                            } else {
                                element.hide();
                            }
                        }

                        //If the element is 'organizations' check to see if the user has permissions to see it
                        if (element.attr('id') == 'organizations') {
                            //Permissions and requirements for creating a new funding association
                            if (($.inArray('Organization Manager', scope.userRoles) > -1)) {
                                element.show();

                                //We need to set the state transition here because we cannot add directives (ui-sref) to the element
                                //that is currently being compiled
                                element.on('click', function () {
                                    $state.go('app.organizations')
                                })
                            } else {
                                element.hide();
                            }
                        }
                    }
                };
            }
        )
    }
);