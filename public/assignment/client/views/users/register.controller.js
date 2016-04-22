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

        function register(newuser) {
            if(newuser.password != newuser.verifypassword)
                $scope.error ="Passwords do not match"
            else {
                newuser.emails = newuser.emails.split(',');
                newuser.roles = ['student'];
                UserService.createUser(newuser).then(
                    function (response) {
                        $rootScope.loggedUser = response;
                        $location.url("/profile");
                    });
            }
        }
    }


})();
