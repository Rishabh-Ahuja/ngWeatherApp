// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })
    
});
//services
weatherApp.service('cityService',function () {
this.city = 'Delhi';
});
// CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService',function($scope,cityService) {
   $scope.city = cityService.city;
   $scope.$watch('city',function () {
       cityService.city = $scope.city;
   });

}]);


weatherApp.controller('forecastController', ['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    $scope.$watch('days',function () {
        $scope.WeatherResult = $scope.WeatherApi.get({q:$scope.city,days:$scope.days})
    });
    $scope.call = 'http://api.apixu.com/v1/forecast.json?key=b8598241aafe4b0d9a424303172202';
    $scope.WeatherApi = $resource($scope.call,{callback:'JSON_CALLBACK'});
    $scope.WeatherResult = $scope.WeatherApi.get({q:$scope.city,days:$scope.days});
    $scope.notFound;
    console.log($scope.days);
    console.log($scope.WeatherResult);
}]);