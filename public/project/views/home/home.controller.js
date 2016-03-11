/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("HomeController",HomeController);

    function HomeController(HomeService, $scope,$location,usSpinnerService) {

        $scope.pageData = pageData;
        $scope.gotoDetailPage =gotoDetailPage;

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/F");
        }

        function pageData() {

            HomeService.getData(render);
            function render(response) {

                $scope.data =response.videos.data;

            }

        }
    }

})();