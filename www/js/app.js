// Cordova listener
document.addEventListener('deviceready', function(){
	// Do some cordova stuff, when the device is ready
}, false);

// Load angular module on our app (loaded on the <html> balise)
var app = angular.module('app', []);

// Route
app.config(function($routeProvider){
	$routeProvider
		.when('/library', {templateUrl: 'view/library.html'})
		.when('/search', {templateUrl: 'view/search.html'})
		.otherwise({redirectTo: '/library'});
});

