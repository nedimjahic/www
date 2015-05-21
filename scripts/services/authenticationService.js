angular.module('SocialStreamApp')
.factory('authenticationService', ['$http', '$timeout', '$rootScope',
    function ($http, $timeout, $rootScope) {

        var user = {};

        var loggedIn = false;

        var url = 'http://localhost:3000/api/users/login';

        var login = function(user, callback) {
                    console.log('login');
                    $http.post(url + '?email=' +  user.email + '&password=' + user.password)
                    .then(function(result){
                        if(result.status === 200){
							              console.log(user.email+user.password);
                            if(result.data != ' '){
                                console.log('result.data: ', result.data);
                                $rootScope.user = result.data;
                                user = result.data;
                                loggedIn = true;
                                callback();
                            }
                            else{
                                console.log('Authentication failed.');
                                loggedIn = false;
                            }
                        }
                    });
                };

        var logout = function() {
            console.log('logout');
            delete user;
            loggedIn = false;
        };

        var isLoggedIn = function() {
            return loggedIn;
        }

        return {

                login: login,
                logout: logout,
                isLoggedIn: isLoggedIn

        };
    }]);
