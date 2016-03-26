
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

    function CategoryController(HomeService,$scope,$routeParams,$location) {

        var category = $routeParams.category;
        $scope.getCategoryDetails =getCategoryDetails;
        $scope.gotoDetailPage=gotoDetailPage;

        $scope.section =category;

        function getCategoryDetails(){
            console.log(category);
            HomeService.getCategoryDetails(category).then(
                function(response){
                    $scope.categorydata = response;
                    console.log(response);
                });
        }

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/F");
        }

    }

})();