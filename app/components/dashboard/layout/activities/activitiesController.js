define(['appModule'], function(app){
    "use strict";

	    return app.controller("activitiesController", activitiesController);

			function activitiesController($scope, $log, activityService){

				$scope.activeTab = 'default';
				$scope.currentActivityItems = [];
				
				// Getting different type of activites
				activityService.get(function(data){

					$scope.activities = data.activities;
					
				});


				$scope.isActive = function(tab){
					return $scope.activeTab === tab;
				};

				$scope.setTab = function(activityType){
					$scope.activeTab = activityType;

					activityService.getbytype(activityType, function(data) {

						$scope.currentActivityItems = data.data;

					});

				};

			}

});