// module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

weatherApp.service('CityService',function(){
    this.city = "Newyork, NY";
});


weatherApp.controller('HomeController',['$scope',function($scope){

}]);

weatherApp.controller('ForecastController',['$scope',function($scope){

}]);

weatherApp.config(function($routeProvider){
    $routeProvider

        .when('/',{
        templateUrl:'views/home.html',
            controller: 'HomeController'
    })

        .when('/forecast',{
            templateUrl:'views/forecast.html',
            controller:'ForecastController'
        })
});