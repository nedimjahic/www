'use strict';

angular.module('SocialStreamApp')
    .controller('loginCtrl', ['$scope', '$rootScope', 'authenticationService', '$location',
        function($scope, $rootScope, authenticationService, $location) {

          $rootScope.title = 'Log in';

          $scope.user = {
          	email: 'henrik',
          	password: 'quantumleap'
          };

          $scope.login = function() {
          	authenticationService.login($scope.user, redirect);
          };

          var redirect = function(){
            if(localStorage.getItem('currentTopic')){
              redirectToStream();
            }
            else{
              redirectToSettings();
            }
          };

          var redirectToStream = function(){
            $location.path('/');
          };

          var redirectToSettings = function(){
            $location.path('/settings');
          };

        }
    ]);
