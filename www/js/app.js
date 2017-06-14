// Cordova listener
document.addEventListener('deviceready', function(){
	// Do some cordova stuff, when the device is ready
}, false);

// Load angular module on our app (loaded on the <html> balise)
var app = angular.module('app', []);

// Route
app.config(function($routeProvider){
	$routeProvider
		.when('/library', {templateUrl: 'views/library.html'})
		.when('/search', {templateUrl: 'views/search.html'})
		.when('/settings', {templateUrl: 'views/settings.html'})
		.otherwise({redirectTo: '/library'});
});

