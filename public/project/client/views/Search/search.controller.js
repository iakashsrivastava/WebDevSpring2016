/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("SearchController",SearchController);

    function SearchController(SearchService, $scope,$location,$routeParams) {

        $scope.searchData = searchData;
        $scope.gotoDetailPage =gotoDetailPage;
        $scope.searchItem = $routeParams.query;
        $scope.showSpinner = true;

        var query = $routeParams.query;

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/d");
        }

        function searchData() {

            SearchService.getSearchData(query,render);

            function render(response) {
                $scope.data = response.list;
                $scope.showSpinner =false;
            }


        }
    }

})();