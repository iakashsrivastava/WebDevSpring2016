/**
 * Created by akash on 2/23/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController(UserService,$scope,$rootScope,$location){

        $scope.register = register;

        function register(newuser){
            UserService.createUser(newuser,callback);

            function callback(response){
                $rootScope.loggedUser = response;
                $location.url('/profile');
            }
        }

    }


})();
