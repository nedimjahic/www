'use strict';

angular.module('SocialStreamApp')
    .controller('settingsCtrl', ['$scope', '$rootScope', '$location', 'host', '$http',
        function($scope, $rootScope, $location, host, $http) {

          $rootScope.title = 'Settings';

          

          $scope.getTopic = function(){
            $http.get('http://' + host +':3000/api/activetopic').success(function(data) {
                        $scope.topic = data.topic;
                        console.log(data);
                        localStorage.setItem('currentTopic', $scope.topic);
                        
                        
                    });

          	
          };

          $scope.setTopic = function(){
            //remove any hastags at the begining of the topic string
            while($scope.topic.charAt(0) === '#')
              $scope.topic = $scope.topic.substr(1);
            
              

            console.log('set ' + $scope.topic);

          	
          	$http.post('http://' + host +':3000/api/activetopic?tag=' + encodeURIComponent($scope.topic)).success(function(data) {
                        
                        console.log(data);
                        localStorage.setItem('currentTopic', $scope.topic);
                    });

            
          	$location.path('/');
            
          };

          $scope.getTopic();


          


        }
    ]);