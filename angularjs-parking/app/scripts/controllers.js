'use strict';
	angular
	.module('parkingApp')
	.controller('parkingCtrl',function($scope){
		console.log('Called within controller : parkingCtrl');

		$scope.cars = [
					{plate : '7E24HO8'},
					{plate : '7E24HO9'},
					{plate : '7E24H10'},
					{plate : '7E24H11'}
				];

		$scope.save = function(car){
			$scope.cars.push(angular.copy(car));
			delete $scope.car;
		};
	});
