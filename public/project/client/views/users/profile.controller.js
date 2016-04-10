/**
 * Created by akash on 2/23/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$scope,$rootScope,$location){

        $scope.profile = $rootScope.loggedUser;
        $scope.update = update;

        function update(loggedUser) {
            UserService.updateUser(loggedUser._id,loggedUser).then(
                function(response){
                    //$rootScope.loggedUser = response;
                        $scope.loggedUser = response;
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }


})();