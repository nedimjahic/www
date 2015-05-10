'use strict';

angular.module('SocialStreamApp')
    .controller('streamCtrl', ['$rootScope', '$scope', '$timeout', 'socialStreamService', 
        function($rootScope, $scope, $timeout, socialStreamService) {
            $rootScope.title = 'Stream';

            $scope.loading = false;
            $scope.showError = false;

            function getActiveTopic(){
                socialStreamService.getActiveTopic().then(function(result){
                    $scope.topic = result.data.topic;
                })
            }

            $scope.tabs = {
                selectedIndex: 0,
                numberOfTabs: 4
            };

            function getPosts(){
                socialStreamService.retreivePosts()
                .success(function(data) {
                    $scope.posts = data;
                    $scope.showError = false;       
                })
                .error(function(data, status, headers, config){
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    $scope.showError = true;
                    $scope.loading = false;
                })
                .then(function(result){                    
                    $scope.loading = false;
                });
            };

            $scope.reload = function(){
                $scope.loading = true;
                getActiveTopic();
                getPosts();

            };

            $scope.reload();
            

            $scope.allow = socialStreamService.allowPost;
            $scope.block = socialStreamService.blockPost;


        }
    ]);