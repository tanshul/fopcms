'use strict';

/* Services */

angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://openinghours.firebaseio.com/')
  .factory('dataService', function($firebase, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);
     return fireData;
  })
  .factory('partyService', function(dataService) {
    var users = dataService.$child('users');
 
    var partyServiceObject = {
      saveParty: function(party, userId) {
        users.$child(userId).$child('listings').$add(party);
        alert("Saved");
       },
      getListingsByUserId: function(userId) {
        return users.$child(userId).$child('listings');
      },
      getListingsId: function(userId) {
        var test = users.$child(userId).$child('listings');
        var name = test[1];
        /*var postsRef = new Firebase("https://openinghours.firebaseio.com/users/3/listings/");
        postsRef.once('value', function(allMessagesSnapshot) {
          allMessagesSnapshot.forEach(function(messageSnapshot) {
            var name = messageSnapshot.child('name').val();
           });
        });*/
      }
    };

    return partyServiceObject;
  })

  .factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);
    var emails = dataService.$child('emails');

    var authServiceObject = {
      register: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          console.log(data);          
          authServiceObject.login(user, function() {
            emails.$add({email: user.email});  
          });
        });
      },
      login: function(user, optionalCallback) {
        auth.$login('password', user).then(function(data) {
          console.log(data);
          if (optionalCallback) {
            optionalCallback();
          }
          $location.path('/addlist');
        });
      },
      logout: function() {
        auth.$logout();
        $location.path('/');
      },
      getCurrentUser: function() {
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      $rootScope.currentUser = null;
    });

    return authServiceObject;
  })
  .filter('datefilter', function($filter)
    {
      return function(input)
    {
    if(input == null){ return ""; } 
      var _date = $filter('date')(new Date(input),'dd MMM yyyy');
      return _date;
    };
  })
  .filter('timefilter', function($filter)
    {
      return function(input)
    {
    if(input == null){ return ""; } 
      var _date = $filter('date')(new Date(input),'h:mm a');
      return _date;
    };
  });  
