/**
 * Created by akash on 2/23/16.
 */
"use strict";
(function(){
    angular
        .module("SocialMashup")
        .controller("RegisterController",RegisterController);

    function RegisterController(UserService,$scope,$rootScope,$location){

        $scope.register = register;

        function register(newuser) {
            UserService.createUser(newuser).then(
                function(response){
                    $rootScope.loggedUser = response;
                    $location.url("/profile");
                });
        }

    }


})();
