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
            $scope.error = '';
            $scope.usernamehasError = '';
            $scope.undefinedUser =false;
            $scope.passwordhasError='';
            $scope.vpasswordhasError ='';
            $scope.firstNamehasError='';

            if(newuser === undefined){
                $scope.undefinedUser = true;
            }
            else if (newuser.username === undefined || newuser.username.length == 0) {
                $scope.error = "Please fill out the required field, marked as red";
                $scope.usernamehasError = 'has-error';
            }
            else if (newuser.password === undefined || newuser.password.length == 0) {
                $scope.error = "Please fill out the required field, marked as red";
                $scope.passwordhasError = 'has-error';
            }
            else if (newuser.password != newuser.verifypassword) {
                $scope.error = "Password and Verify Password do not match"
                $scope.passwordhasError = 'has-error';
                $scope.vpasswordhasError = 'has-error';
            }
            else if (newuser.firstName === undefined || newuser.firstName.length == 0) {
                $scope.error = "Please fill out the required field, marked as red";
                $scope.firstNamehasError = 'has-error';
            }else {
                UserService.createUser(newuser).then(
                    function (response) {
                        console.log(response);
                        if(response === null){
                            $scope.error = 'Sorry!!! username already taken. Please select different username.';
                        }
                        var user = response;
                        if (user != null) {
                            $rootScope.loggedUser = user;
                            $location.url("/home");
                        }
                    },
                    function (err) {
                        $scope.error = 'Error while registering user!'+ err;
                    });
            }
        }

    }


})();
