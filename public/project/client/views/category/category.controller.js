
/**
 * Created by akash on 3/24/16.
 */
/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("CategoryController",CategoryController);

    function CategoryController(HomeService,$scope,$routeParams,$location,$window) {

        var category = $routeParams.category;
        $scope.getCategoryDetails =getCategoryDetails;
        $scope.gotoDetailPage=gotoDetailPage;
        $scope.detailedContent = {name :category, page:0, content: []};
        $scope.section =category;
        $scope.showSpinnerBottom = false;

        function getCategoryDetails1(){
            HomeService.getCategoryDetails(category).then(
                function(response){
                    $scope.categorydata = response;
                    console.log(response);
                });
        }

        function getCategoryDetails(){
            HomeService.getCategoryDetails($scope.detailedContent.name,$scope.detailedContent.page).then(
                function(response){
                    $scope.detailedContent.content.push(response);
                    $scope.showSpinnerBottom = false;
                });
            $scope.detailedContent.page = $scope.detailedContent.page + 30;
        }

        function gotoDetailPage(id,source){
            if(source != undefined)
                $location.url("/details/"+id+"/d");
            else
                $location.url("/details/"+id+"/F");
        }



        angular.element($window).bind("scroll", function() {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                console.log(windowBottom);
                $scope.showSpinnerBottom = true;
                getCategoryDetails();
            }
        });
    }

})();