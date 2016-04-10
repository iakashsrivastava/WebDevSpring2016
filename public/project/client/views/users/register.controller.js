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
                    console.log(response);
                    //$rootScope.loggedUser = response;
                    //$location.url("/profile");
                    var user = response;
                    if(user != null) {
                            $rootScope.loggedUser = user;
                            $location.url("/home");
                        }
                    },
                    function(err) {
                        $scope.error = err;
                });
        }

    }


})();
