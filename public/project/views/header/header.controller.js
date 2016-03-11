/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location) {

        $scope.call =call;

        function call(searchText){
            $location.url("/search/"+searchText);
        }

    }

})();