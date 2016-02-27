/**
 * Created by akash on 2/25/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$rootScope,$location){

            $scope.logout = logout;
            $scope.user =user;

        function logout(){
            $rootScope.loggedUser = null;
            $location.url("/home");
        }

        function user(){
            $location.url("/profile");
        }



    }
})();