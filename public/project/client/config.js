/**
 * Created by akash on 3/2/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup")
        .config(configuration);


    function configuration($routeProvider){
        $routeProvider

            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                controller:"HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/details/:Id/:Source",{
                templateUrl: "./views/detail/detail.view.html",
                controller:"DetailsController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/search/:query",{
                templateUrl: "./views/Search/search.view.html",
                controller:"SearchController"
            })
            .when("/category/:category",{
                templateUrl: "./views/category/category.view.html",
                controller:"CategoryController"
            })

            .when("/profile",{
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/register",{
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController"
            })

            .when("/login",{
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController"

            })

            .when("/personalise",{
                templateUrl: "./views/personalise/personalise.view.html",
                controller: "PersonaliseController"

            })

            .when("/trends",{
                templateUrl: "./views/trends/trends.view.client.html",
                controller:"TrendsController"
            })

            .when("/trending",{
                templateUrl: "views/trending/trending.view.client.html",
                controller:"TrendingController"
            })

            .otherwise({
                redirectTo: "/home"
            });

    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.loggedUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.loggedUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();
