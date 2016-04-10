/**
 * Created by akash on 3/3/16.
 */

(function () {
    angular
        .module("SocialMashup")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {

        $scope.call = call;
        $scope.gotoHome = gotoHome;
        $scope.logout = logout;
        $scope.user = user;

        //function logout(){
        //    $rootScope.loggedUser = null;
        //    $location.url("/home");
        //}

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


        function user() {
            $location.url("/profile");
        }

        function gotoHome() {
            $location.url("/home");
        }

        function call(searchText) {
            $location.url("/search/" + searchText);
        }

    }

})();