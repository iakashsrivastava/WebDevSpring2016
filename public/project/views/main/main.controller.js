/**
 * Created by akash on 2/25/16.
 */
"use strict";
(function(){
    angular
        .module("SocialMashup")
        .controller("MainController", MainController);

    function MainController($location, $scope){
        $scope.$location = $location;
    }

})();