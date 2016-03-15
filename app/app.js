'use strict';

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var myApp = angular.module('myApp', ['ngRoute']);

// configure our routes
myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'view/home.html',
            controller  : 'mainController'
        })
        // route for the about page
        .when('/destinations', {
            templateUrl : 'view/destinations.html',
            controller  : 'desController'
        })
        // route for the contact page
        .when('/gallery', {
            templateUrl : 'view/gallery.html',
            controller  : 'galleryController'
        });
    // use the HTML5 History API
    $locationProvider.html5Mode(true).hashPrefix('!');
});

// create the controller and inject Angular's $scope
myApp.controller('mainController', function($scope) {
    // take half of device screen height
    $scope.iframeHeight = screen.height / 2;
});

myApp.controller('desController', function($scope, $http) {
    // Get Destinations Data
    $http({
        method:'GET',
        url:'../data/destinations.json'
      }).success(function (data,status){
        $scope.destinations = data.destinations;
        console.log("Data " + data);
        console.log("Status " + status);
      }).error(function(error){
        console.log("Error " + error);
      });
});

myApp.controller('galleryController', function($scope, $http) {
    // Get destinations data
    $http({
      method:'GET',
      url:'../data/destinations.json'
    }).success(function (data,status){
      $scope.destinations = data.destinations;
      console.log("Data " + data);
      console.log("Status " + status);
    }).error(function(error){
      console.log("Error " + error);
    });

  $scope.showImg = function(src){
    var img = '<img src="' + src + '" class="img-responsive"/>';
    $('#myModal').modal();
    $('#myModal').on('shown.bs.modal', function(){
      $('#myModal .modal-body').html(img);
    });
    $('#myModal').on('hidden.bs.modal', function(){
      $('#myModal .modal-body').html('');
    });
  };
});
