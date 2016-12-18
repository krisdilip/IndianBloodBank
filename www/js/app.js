// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('BloodBank', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: 'templates/state.html',
			controller: 'StateCtrl'
		})
		.state('state', {
			url: "/state/:stateId",
			templateUrl: "templates/district.html",
			controller: "DistrictCtrl"
		})
		.state('district', {
			url: "/district/:stateId/:districtId",
			templateUrl: "templates/bank.html",
			controller: "BankCtrl"
		})
		;
		
	$urlRouterProvider.otherwise('/index');
		
}]);

app.controller('StateCtrl',function($scope) {
	$scope.statesData = bloodData;
});

app.controller('DistrictCtrl', function($scope, $stateParams){
	// Load the districts based on the state index passed
	if($stateParams.stateId){
		$scope.districtData = bloodData[$stateParams.stateId];
	};	
});


app.controller('BankCtrl', function($scope, $stateParams, $state){
	// Load the districts based on the state index passed
	if($stateParams.stateId && $stateParams.districtId){
		$scope.bankData = bloodData[$stateParams.stateId].districts[$stateParams.districtId];
	};	
	
	$scope.fn_hide = function(p_value){
		if(p_value=="NA"){
			return true;
		}
		
		return false;
	};
	
	$scope.fn_Dial = function(number) {
		window.open('tel:' + number, '_system');
	};
	
	$scope.fn_open_url = function(websiteUrl) {
		window.open(websiteUrl, '_system');
	};
	
	$scope.fn_SplitTelNo = function(stringToSplit) {
		return stringToSplit.split(",");
	};
	
	$scope.fn_ShowMap = function(plat, plng){
		$state.go("single", {lat:plat,lng:plng});			
	};
});
