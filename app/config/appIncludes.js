define([

    //AUTHENTICATION
    'components/login/loginModule',
    'components/login/loginController',
    'components/login/loginInfoDirective',
    'components/login/resetPasswordController',
    'api/authService',


    //API SERVICE
    'api/apiService',
    'api/userService',
    'api/clientService',
    'api/rolesService',
    'api/employeeService',

    //components
    'components/dashboard/dashboardModule',
    'components/dashboard/employees/employeesListModule',
    'components/dashboard/employees/employeesListService',
    'components/dashboard/employees/employeesListController',
    'components/dashboard/employees/gridRow/employeesRowController',
    'components/dashboard/employees/gridRow/employeeRowDirective',

    'components/dashboard/employee/employeeModule',
    'components/dashboard/employee/employeeEditController',
    'components/dashboard/employee/employeeNewController',
    'components/dashboard/employee/employeeEmailDirective',

    'components/dashboard/user/userModule',
    'components/dashboard/user/userEditController',
    'components/dashboard/user/userNewController',
    'components/dashboard/user/userEmailDirective',
    'components/dashboard/user/userPasswordDirective',

    'components/dashboard/layout/activities/activitiesController',
    'components/dashboard/layout/activities/activitiesDirective',
    'components/dashboard/layout/activities/activitiesService',


    //SHARED
    'lib/pegula-lib/js/minifyMenu',
    'lib/pegula-lib/js/searchMobile',
    'lib/pegula-lib/js/smartInclude',
    'lib/pegula-lib/js/smartDeviceDetect',
    'lib/pegula-lib/js/smartFastClick',
    'lib/pegula-lib/js/smartLayout',
    'lib/pegula-lib/js/smartRouterAnimationWrap',
    'lib/pegula-lib/js/smartFitAppView',
    'lib/pegula-lib/js/smartMenu',

    'lib/pegula-lib/js/smartPageTitle',
    'lib/pegula-lib/js/hrefVoid',
    'lib/pegula-lib/js/SmartCss',
    'lib/pegula-lib/js/dropdownToggle',
    'lib/pegula-lib/js/SmartNotification.min',

    'assets/js/directives/rowTemplateDirective',
    'assets/js/directives/uiBreadcrumbs',
    'assets/js/formTypes/editInput/editInputDirective',

    'components/dashboard/layout/rightSidebar/rightSidebarDirective',
    'components/dashboard/layout/leftSidebar/leftSidebarDirective',

    'appController'

], function () {
    'use strict';
});
