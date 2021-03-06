/**
 * Created by akash on 2/23/16.
 */

"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService,$scope,$rootScope,$location){

        $scope.login = login;

        function login(existingUser){
            UserService.findUserByCredentials(existingUser.username,existingUser.password).then(
                function(response){
                    console.log(response);
                    if(response !== null) {
                        $rootScope.loggedUser = response.data;
                        $location.url("/profile");
                    }
                });
        }

    }


})();