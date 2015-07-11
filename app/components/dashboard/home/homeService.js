/**
 * Created by Ivana on 14.5.2015..
 */
define(['components/dashboard/home/homeModule', 'lodash'], function (module, _) {
    "use strict";

    return module.registerFactory('homeService', function ($sessionStorage) {


        var homeService = {
            //Users tab is visible for all
            'types': [{
                "title": "USERS",
                "name": "Users"
            }],
            'users':[],

        };
        return homeService;
    });

});
