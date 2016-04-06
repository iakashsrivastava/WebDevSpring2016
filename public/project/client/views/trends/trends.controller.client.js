/**
 * Created by akash on 4/6/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup")
        .controller("TrendsController",TrendsController);

    function TrendsController(TrendsService,$scope,$rootScope,$location){

        $scope.loadTrends = loadTrends;
        loadTrends();

        function loadTrends(){
            TrendsService.getTrendsData().then(
                function(response){
                    console.log(response);
                    $scope.trends = response;
                });
        }

    }


})();