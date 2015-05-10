'use strict';

angular.module('SocialStreamApp')
	.directive('ssPost', [function(){
		// Runs during compile
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'scripts/directives/postTpl.html'
		};
	}]);