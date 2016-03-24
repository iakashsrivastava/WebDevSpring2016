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
                    $scope.categories.push({
                        items:response,
                        name:"News"
                    });
                    $scope.data =true;
                });
        }

        function getEntertaintmentData(){
            HomeService.getEntertaintmentData().then(
                function(response){
                    $scope.categories.push({
                        items:response,
                        name:"Entertaintment"
                    });
                    $scope.entertaintmentdata =true;
                });
        }


    }

})();