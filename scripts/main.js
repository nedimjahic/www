'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
 *
 * Main module of the application.
 */
angular
    .module('SocialStreamApp', [
        'ngRoute',
        'mm.foundation'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/stream.html',
                controller: 'streamCtrl',
                settings: {
                    hasAccess: function() {
                        return false;
                    }
                }
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'settingsCtrl',
                settings: {
                    hasAccess: function() {
                        return false;
                    }
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl',
                settings: {
                    hasAccess: function() {
                        return true;
                    }
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    })
    .filter('filterPosts', ['postStates', function(postStates){

      return function(posts, visiblePosts){
            var filtered = [];
            angular.forEach(posts, function(post){
              if (visiblePosts === postStates.unprocessed) {
                if (post.state === 'unprocessed') {
                  filtered.push(post);
                };
              }
              else if(visiblePosts === postStates.processed) {
                if(post.state === 'allowed' || post.state === 'blocked'){
                  filtered.push(post);
                }
              }
            });
            if (filtered.length === 0) {};
            return filtered;
      }

    }])
    .run(function($rootScope, postStates, authenticationService, $location) {
        $rootScope.visiblePosts = postStates.unprocessed;
        $rootScope.title = 'Stream';

        $rootScope.showArchive = function() {
            $rootScope.visiblePosts = postStates.processed;
            $rootScope.title = 'Archive';

        };

        $rootScope.showStream = function() {
            $rootScope.visiblePosts = postStates.unprocessed;
            $rootScope.title = 'Stream';
        }


        $rootScope.logout = authenticationService.logout;

            // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function (event, next) {
            console.log(authenticationService.isLoggedIn());
            if (!authenticationService.isLoggedIn()) {
              $location.path('/login');
            }
        });
    });