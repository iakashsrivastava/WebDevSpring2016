/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$rootScope,$location) {

        $scope.call =call;
        $scope.gotoHome =gotoHome;
        $scope.logout = logout;
        $scope.user =user;

        function logout(){
            $rootScope.loggedUser = null;
            $location.url("/home");
        }

        function user(){
            $location.url("/profile");
        }

        function gotoHome(){
            $location.url("/home");
        }

        function call(searchText){
            $location.url("/search/"+searchText);
        }

    }

})();