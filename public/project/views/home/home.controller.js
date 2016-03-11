/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("HomeController",HomeController);

    function HomeController(HomeService, $scope) {

        $scope.pageData = pageData;

        function pageData() {

            HomeService.getData(render);

            function render(response) {
                $scope.data =response.videos.data;

            }

        }
    }

})();