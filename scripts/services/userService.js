angular.module('SocialStreamApp', [])
    .service('userService', function() {
      var user = {};

      var addUser = function(newObj) {
          user = newObj;
          console.log('userService: '+user);
      };

      var getUser = function(){
          return user;
      };

      return {
        addUser: addUser,
        getUser: getUser
      };

    });
