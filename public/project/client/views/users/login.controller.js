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

        function login(existingUser) {
            $scope.usernameBlank = false;
            $scope.passwordBlank = false;
            $scope.unauthorised = false;
            $scope.noInfo = false;
            $scope.usernamehasError = '';
            $scope.passwordError= '';

            if(existingUser === undefined){
                $scope.noInfo = true
                $scope.usernamehasError='has-error';
                $scope.passwordError='has-error';
            }
            else if (existingUser.username === undefined || existingUser.username.length == 0) {
                $scope.usernameBlank = true;
                $scope.usernamehasError='has-error';
            }
            else if (existingUser.password === undefined ||  existingUser.password.length == 0) {
                $scope.passwordBlank = true;
                $scope.passwordError='has-error';
            }
            else {
                console.log(existingUser.username +',' +existingUser.password)
                UserService.findUserByCredentials(existingUser.username, existingUser.password).then(
                    function (response) {
                        $rootScope.loggedUser = response.data;
                        console.log(response.data);
                        $location.url("/home");
                    },
                    function (err) {
                        $scope.unauthorised = true;
                        $scope.error = err;
                    }
                );
            }
        }

    }


})();