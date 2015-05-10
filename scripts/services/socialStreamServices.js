'use strict';
angular.module('SocialStreamApp')
    .factory('socialStreamService', ['$http', 'host',
        function($http, host) {

            var posts = [];

            return {
                retreivePosts: function() {
                    return  $http.get('http://' + host +':3000/api/posts/').success(function(data) {
                        posts = data;
                        console.log(data);
                        return posts;
                    });

                },
                posts: posts,
                allowPost: function(post) {
	                console.log('Approving post (id: ' + post.id + ')');
                    $http.put('http://' + host +':3000/api/posts/' + post.id + '?state=allowed')
                        .success(function() {
                            console.log('Post approved (id: ' + post.id + ')');
                            post.state = 'allowed';

                        })
                        .error(function() {
                            console.log('Something went wrong. No action performed!');
                        });

                },
                blockPost: function(post) {
                    console.log('Blocking post (id: ' + post.id + ')');
                    $http.put('http://' + host +':3000/api/posts/' + post.id + '?state=blocked')
                        .success(function() {
                            console.log('Post blocked (id: ' + post.id + ')');
                            post.state = 'blocked';
                        })
                        .error(function() {
                            console.log('Something went wrong. No action performed!');
                        });
                },
                getActiveTopic: function(){
                    return $http.get('http://' + host +':3000/api/activetopic');
                }
            };
        }
    ]);