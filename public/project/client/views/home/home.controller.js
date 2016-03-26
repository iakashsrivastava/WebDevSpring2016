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
        $scope.getEntertainmentData = getEntertainmentData;
        $scope.getSportsData =getSportsData;
        $scope.getScienceData =getScienceData;
        $scope.getCategoryDetails=getCategoryDetails;


        $scope.categories =[];

        function getCategoryDetails(category){
            $location.url("/category/"+category);
        }

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
                });
        }

        function getEntertainmentData(){
            HomeService.getEntertainmentData().then(
                function(response){
                    $scope.categories.push({
                        items:response,
                        name:"Entertainment"
                    });
                });
        }

        function getSportsData(){
            HomeService.getSportsData().then(
                function(response){
                    $scope.categories.push({
                        items:response,
                        name:"Sports"
                    });
                });
        }

        function getScienceData(){
            console.log("client controller");
            HomeService.getScienceData().then(
                function(response){
                    $scope.categories.push({
                        items:response,
                        name:"Science"
                    });
                });
        }


    }

})();