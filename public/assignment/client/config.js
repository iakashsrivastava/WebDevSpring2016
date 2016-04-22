/**
 * Created by akash on 2/23/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider){
        $routeProvider

            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })

            .when("/modal",{
                templateUrl: "./views/forms/modalTest.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })

            .when("/forms",{
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })

            .when("/fields/:formId/title/:title",{
                templateUrl: "./views/forms/form-fields.view.html",
                controller: "FieldController",
                resolve: {
                    loggedin: checkCurrentUser
                }

            })

            .when("/profile",{
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .when("/admin",{
                templateUrl: "./views/admin/admin.view.html",
                controller: "AdminController",
                resolve: {
                    loggedin: checkAdmin
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

            .otherwise({
                redirectTo: "/home"
            });

    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            console.log("LoggedIn" + user);
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

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            console.log("checked User" + user);
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

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.loggedUser = user;
                deferred.resolve();
            } else {
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();
