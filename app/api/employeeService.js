/**
 * Created by Ivana on 10.6.2015..
 */
/**
 * Created by Ivana on 28.5.2015..
 */
define(['appModule'], function (module) {

    'use strict';

    return module.registerFactory('employeeService', function (apiService) {

        var employeeService = {

            /**
             * Gets the employee with the provided email and returns a promise
             * @param email
             * @returns {*}
             */
            'getEmployee': function (email) {
                return apiService.request({
                    'method': "GET",
                    'url': "/employees/" + email
                })
            },

            /**
             * Gets the list of all employees and returns a promise
             * @returns {*}
             */
            'getEmployees': function () {
                return apiService.request({
                    'method': "GET",
                    'url': "/employees"
                })
            },

            /**
             * Creates a new employee from the provided employee param
             * and returns a promise
             * @param employee
             * @returns {*}
             */
            'createEmployee': function (employee) {
                return apiService.request({
                    'method': "POST",
                    'url': "/employees",
                    'data': employee
                });
            },

            /**
             * Updates the employee with the provided email and employee properties
             * and returns a promise
             * @param email
             * @param employee
             * @returns {*}
             */
            'updateEmployee': function (email, employee) {
                return apiService.request({
                    method: "PUT",
                    url: "/employees/" + email,
                    data: employee
                });
            },

            /**
             * Gets all employees that match the criteria passed in data
             * and returns a promise
             * @param data
             * @returns {*}
             */
            'searchEmployees': function (data) {
                return apiService.request({
                    'method': "GET",
                    'url': "/employees",
                    'params':{
                        'search' : data
                    }
                })
            },

            /**
             * Changes the status of the employee with the provided email
             * to 'deactivated'
             * @param email
             * @returns {*}
             */
            'deactivateEmployee': function(email){
                return apiService.request({
                    'method': 'PATCH',
                    'url': '/employees/' + email,
                    'data': {
                        'status': 'Deactivated'
                    }
                })
            }
        }

        return employeeService;
    })
});
