'use strict';

angular
	.module('parkingApp')
	.filter('hyphenCasing', function(){
		return function(dataVal, symbol){
			var first = dataVal.substring(0,3);
			var second = dataVal.substring(3);
			return first + symbol + second;
		}
	});
