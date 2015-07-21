/**
 * Created by Ivana on 14.5.2015..
 */
define(['components/dashboard/employees/employeesListModule', 'lodash'], function (module, _) {
    "use strict";

    return module.registerFactory('employeesListService', function ($sessionStorage) {


        var employeesListService = {
            //All tab is visible for all
            'types': [{
                "title": "ALL",
                "name": "All"
            },
                {
                    "title": "FULL-TIME",
                    "name": "Full-TIme"
                },
                {
                    "title": "CONTRACT",
                    "name": "Contract"
                },
                {
                    "title": "CANDIDATES",
                    "name": "Candidates"
                }],

        };
        return employeesListService;
    });

});
