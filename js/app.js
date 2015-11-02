'use strict';
angular.module('myApp', ['ngRoute','ui.bootstrap','firebase'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/addlist', {
		templateUrl: 'partials/addlist.html',
		controller: 'AddlistController'
	});
	$routeProvider.when('/showlist', {
		templateUrl: 'partials/showlist.html',
		controller: 'AddlistController'
	}); 
	$routeProvider.when('/editlist/:itemId', {
		templateUrl: 'partials/editlist.html',
		controller: 'EditlistController'
	}); 	 
	$routeProvider.when('/newlist', {
		templateUrl: 'partials/newlist.html',
		controller: 'NewListController'
	});
	$routeProvider.when('/inbox', {
		templateUrl: 'partials/inbox.html',
		controller: 'MessageController'
	});	  	
	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'AuthController'
	});
	$routeProvider.otherwise({redirectTo: '/login'});
}])


 .value('fbURL', 'https://foh.firebaseio.com/items/')


.factory('authService', ['$firebaseAuth',function($firebaseAuth) {
    var ref = new Firebase("https://foh.firebaseio.com");
    return $firebaseAuth(ref);
}])

.factory('Items', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://foh.firebaseio.com/items');
  return $firebaseArray(itemsRef);
}])

.factory('GetItem', ['$firebaseArray','$firebaseObject', function($firebaseArray,$firebaseObject) {
  var itemsRef = new Firebase('https://foh.firebaseio.com/items');
    return {
      get: function (listid) {
      	return $firebaseObject(itemsRef.child( listid ));
      }
    }

}])

.factory('Submissions', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://foh.firebaseio.com/submissions');
  return $firebaseArray(itemsRef);
}])

.factory('Messages', ['$firebaseArray', function($firebaseArray) {
  var itemsRef = new Firebase('https://foh.firebaseio.com/messages');
  return $firebaseArray(itemsRef);
}])

.controller('AuthController', ['$scope', 'authService','$location', function($scope, authService,$location) {
	$scope.logout = function() {		
		authService.$unauth();
		window.location.reload();
	};
	$scope.login = function() {
		authService.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		}).then(function(authData) {
			$scope.email = null;
			$scope.password = null;
 			$location.path('/addlist');
		}).catch(function(error) {
			alert(error);
			console.log(error);
		});       
	};

}])

.controller('AddlistController', ['$scope', 'authService','$location','Items','$filter', function($scope, authService,$location,Items,$filter) {

  	//sort defaults
  	$scope.sortType = 'name';
  	$scope.sortReverse = false;

 	var authData = authService.$getAuth();
	if (authData) {

  		$scope.items = Items;

		function resetObj(){	
			$scope.newParty = {
				name: '',address: '',city: '',category: '',phone: '',altphone: '',fax: '',email: '',website: '',publicholidays: '',directions: '',tags:'',
				mon_closed: false,
				tue_closed: false,
				wed_closed: false,
				thu_closed: false,
				fri_closed: false,
				sat_closed: false,
				sun_closed: false
			};

			//set defaults on timers
			var startdate = new Date();
			var enddate = new Date();

			//when was the entry added
			$scope.newParty.dateadded = startdate;

			//set defaults
			startdate.setHours( 8 );
			startdate.setMinutes( 0 );

			//set defaults
			enddate.setHours( 17 );
			enddate.setMinutes( 0 );

			//set defaults 8am - 5pm
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

		resetObj();

		/* Settings for timer directive */
		$scope.ismeridian = true; //Show AM PM
		$scope.hstep = 1;
		$scope.mstep = 15;
		$scope.options = {hstep: [1, 2, 3],mstep: [1, 5, 10, 15, 25, 30]};		
		
		// save to fb
		$scope.saveParty = function(){
			$scope.newParty.mon_start = $filter('date')($scope.newParty.mon_start, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.mon_end = $filter('date')($scope.newParty.mon_end, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.tue_start = $filter('date')($scope.newParty.tue_start, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.tue_end = $filter('date')($scope.newParty.tue_end, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.wed_start = $filter('date')($scope.newParty.wed_start, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.wed_end = $filter('date')($scope.newParty.wed_end, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.thu_start = $filter('date')($scope.newParty.thu_start, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.thu_end = $filter('date')($scope.newParty.thu_end, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.fri_start = $filter('date')($scope.newParty.fri_start, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.fri_end = $filter('date')($scope.newParty.fri_end, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.sat_start = $filter('date')($scope.newParty.sat_start, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.sat_end = $filter('date')($scope.newParty.sat_end, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.sun_start = $filter('date')($scope.newParty.sun_start, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.sun_end = $filter('date')($scope.newParty.sun_end, "yyyy-MM-dd HH:mm:ss");
			$scope.newParty.dateadded = $filter('date')($scope.newParty.sun_end, "yyyy-MM-dd HH:mm:ss");

			$scope.items.$add($scope.newParty);
	      	//resetObj();
	      	alert("New listing has been added.");
	      	location.reload();
		};		

		// Remove item   
		$scope.removeItem= function(item) {
		  $scope.items.$remove(item).then(function(){
		    alert('Deleted !!! what have you done !');
		  });
		};

	}else{
	 	$location.path('/login');
	}

}])

.controller('EditlistController', ['$scope', 'authService','$location','$filter','$routeParams','GetItem', function($scope, authService,$location,$filter,$routeParams,GetItem) {
 	var authData = authService.$getAuth();
	if (authData) {

		$scope.item = GetItem.get($routeParams.itemId); 
		/* Settings for timer directive */
		$scope.ismeridian = true; //Show AM PM
		$scope.hstep = 1;
		$scope.mstep = 15;
		$scope.options = {hstep: [1, 2, 3],mstep: [1, 5, 10, 15, 25, 30]};	

    	$scope.editItem = function() {
			$scope.item.mon_start = $filter('date')($scope.item.mon_start, "yyyy-MM-dd HH:mm:ss");
			$scope.item.mon_end = $filter('date')($scope.item.mon_end, "yyyy-MM-dd HH:mm:ss");
			$scope.item.tue_start = $filter('date')($scope.item.tue_start, "yyyy-MM-dd HH:mm:ss");
			$scope.item.tue_end = $filter('date')($scope.item.tue_end, "yyyy-MM-dd HH:mm:ss");
			$scope.item.wed_start = $filter('date')($scope.item.wed_start, "yyyy-MM-dd HH:mm:ss");
			$scope.item.wed_end = $filter('date')($scope.item.wed_end, "yyyy-MM-dd HH:mm:ss");
			$scope.item.thu_start = $filter('date')($scope.item.thu_start, "yyyy-MM-dd HH:mm:ss");
			$scope.item.thu_end = $filter('date')($scope.item.thu_end, "yyyy-MM-dd HH:mm:ss");
			$scope.item.fri_start = $filter('date')($scope.item.fri_start, "yyyy-MM-dd HH:mm:ss");
			$scope.item.fri_end = $filter('date')($scope.item.fri_end, "yyyy-MM-dd HH:mm:ss");
			$scope.item.sat_start = $filter('date')($scope.item.sat_start, "yyyy-MM-dd HH:mm:ss");
			$scope.item.sat_end = $filter('date')($scope.item.sat_end, "yyyy-MM-dd HH:mm:ss");
			$scope.item.sun_start = $filter('date')($scope.item.sun_start, "yyyy-MM-dd HH:mm:ss");
			$scope.item.sun_end = $filter('date')($scope.item.sun_end, "yyyy-MM-dd HH:mm:ss");
			$scope.item.dateadded = $filter('date')($scope.item.sun_end, "yyyy-MM-dd HH:mm:ss");    

			//when was the entry updated
			$scope.item.dateupdated = new Date();
			console.log($scope.items);
			$scope.item.$save();
			alert("Listing updated, i hope you know what you are doing.");
			$location.path('/showlist');
		}		

	}else{
	 	$location.path('/login');
	}  	
}])


.controller('NewListController', ['$scope', 'authService','$location','Submissions','$filter', function($scope, authService,$location,Submissions,$filter) {
  	//sort defaults
  	$scope.sortType = 'name';
  	$scope.sortReverse = false;

 	var authData = authService.$getAuth();
	if (authData) {
  		$scope.items = Submissions;
	}else{
	 	$location.path('/login');
	}

}])

.controller('MessageController', ['$scope', 'authService','$location','Messages','$filter', function($scope, authService,$location,Messages,$filter) {
 
 	var authData = authService.$getAuth();
	if (authData) {
  		$scope.items = Messages;
	}else{
	 	$location.path('/login');
	}

}])

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

 
