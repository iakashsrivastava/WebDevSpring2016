/**
 * Created by akash on 2/23/16.
 */

"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$scope,$rootScope,$location){

        $scope.profile = $rootScope.loggedUser;
        $scope.update = update;

        function update(loggedUser){
            UserService.updateUser(loggedUser._id,loggedUser,callback);

            function callback(response){
                $rootScope.loggedUser = response;
            }
        }
    }


})();