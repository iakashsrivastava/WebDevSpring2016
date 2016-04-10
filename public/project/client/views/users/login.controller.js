/**
 * Created by akash on 2/23/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup")
        .controller("LoginController",LoginController);

    function LoginController(UserService,$scope,$rootScope,$location){

        $scope.login = login;

        function login(existingUser){
            UserService.findUserByCredentials(existingUser.username,existingUser.password).then(
                function(response){
                    //if(response !== null) {
                    //    //$rootScope.loggedUser = response;
                    //    //$location.url("/profile");
                    //}

                        $rootScope.loggedUser = response.data;
                        console.log(response.data);
                        $location.url("/profile");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

    }


})();