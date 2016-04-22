/**
 * Created by akash on 2/25/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$rootScope,$location,UserService){

            $scope.logout = logout;
            $scope.user =user;

        function logout() {
            UserService.logout().then(
                function (response) {
                    $rootScope.loggedUser = null;
                    $location.url("/home");
                },
                function (err) {
                    $scope.error = err;
                }
            );
        }

        function user(){
            $location.url("/profile");
        }
    }
})();