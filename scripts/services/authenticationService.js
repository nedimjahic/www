angular.module('SocialStreamApp')
.factory('authenticationService', ['$http', '$timeout',
    function ($http, $timeout) {

        var user = {};

        var loggedIn = false;

        var url = 'http://188.166.17.106:3000/api/users/login';

        var login = function(user, callback) {
                    console.log('login');
                    $http.post(url + '?email=' +  user.email + '&password=' + user.password)
                    .then(function(result){
                        if(result.status === 200){
							console.log(user.email+user.password);
                            if(result.data != ' '){
                                user = result.data;
                                console.log(user);
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
