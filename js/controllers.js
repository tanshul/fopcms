'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('AddlistController', ['$scope', 'partyService', 'authService', function($scope, partyService, authService) {

    // Bind user's listings to $scope.listings.
    authService.getCurrentUser().then(function(user) {
      if (user) {
        $scope.listings = partyService.getListingsByUserId(user.id);
       };
    });

    // Object to store data from the waitlist form.
      $scope.newParty = {
        name: '',
        address: '',
        phone: '',
        email: '',
        directions: '',
        mon_closed: false,
        tue_closed: false,
        wed_closed: false,
        thu_closed: false,
        fri_closed: false,
        sat_closed: false,
        sun_closed: false
      };

    // Date Stuff
      var startdate = new Date();
      var enddate = new Date();

      //set defaults
      startdate.setHours( 8 );
      startdate.setMinutes( 0 );

      //set defaults
      enddate.setHours( 17 );
      enddate.setMinutes( 0 );

      $scope.newParty.dateadded = startdate;

      $scope.newParty.mon_start = startdate;
      $scope.newParty.tue_start = startdate;
      $scope.newParty.wed_start = startdate;
      $scope.newParty.thu_start = startdate;
      $scope.newParty.fri_start = startdate;
      $scope.newParty.sat_start = startdate;
      $scope.newParty.sun_start = startdate;

      $scope.newParty.mon_end = enddate;
      $scope.newParty.tue_end = enddate;
      $scope.newParty.wed_end = enddate;
      $scope.newParty.thu_end = enddate;
      $scope.newParty.fri_end = enddate;
      $scope.newParty.sat_end = enddate;
      $scope.newParty.sun_end = enddate;      

      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };

      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };

      $scope.update = function() {
        var startdate = new Date();
        var enddate = new Date();

        startdate.setHours( 14 );
        startdate.setMinutes( 0 );
        enddate.setHours( 14 );
        enddate.setMinutes( 0 ); 

        $scope.newParty.mon_start = startdate;
        $scope.newParty.tue_start = startdate;
        $scope.newParty.wed_start = startdate;
        $scope.newParty.thu_start = startdate;
        $scope.newParty.fri_start = startdate;
        $scope.newParty.sat_start = startdate;
        $scope.newParty.sun_start = startdate;

        $scope.newParty.mon_end = enddate;
        $scope.newParty.tue_end = enddate;
        $scope.newParty.wed_end = enddate;
        $scope.newParty.thu_end = enddate;
        $scope.newParty.fri_end = enddate;
        $scope.newParty.sat_end = enddate;
        $scope.newParty.sun_end = enddate;         
      };

      $scope.changed = function () {
        console.log('Time changed to: ' + $scope.newParty.mon_start);
      };
 
    // Function to save a new party to the waitlist.
    $scope.saveParty = function() {
      partyService.saveParty($scope.newParty, $scope.currentUser.id);
      $scope.newParty = {name: '', address: '', phone: '',email: '', directions: ''};
    };

  }])
 

  .controller('AuthController', ['$scope', 'authService', function($scope, authService) {

    // Object bound to inputs on the register and login pages.
    $scope.user = {email: '', password: ''};

    // Method to register a new user using the authService.
    $scope.register = function() {
      authService.register($scope.user);
    };

    // Method to log in a user using the authService.
    $scope.login = function() {
      authService.login($scope.user);
    };

    // Method to log out user using the authService.
    $scope.logout = function() {
      authService.logout();
    };

  }]);
  