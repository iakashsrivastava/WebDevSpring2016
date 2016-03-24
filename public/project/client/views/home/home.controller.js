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
        $scope.getEntertaintmentData = getEntertaintmentData;
        $scope.sortOption ={
            handle : '.mover'
        };
        $scope.categories =[];

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/F");
        }

        function pageData(){
            HomeService.getData().then(
                function(response){
                    $scope.data =response;
                    $scope.categories.push(response);
                });
        }

        function getEntertaintmentData(){
            HomeService.getEntertaintmentData().then(
                function(response){
                    $scope.entertaintmentdata =response;
                    $scope.categories.push(response);
                });
        }


    }

})();