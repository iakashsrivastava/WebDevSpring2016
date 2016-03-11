/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("SearchController",SearchController);

    function SearchController(SearchController, $scope,$location) {

        $scope.searchData = searchData;
        $scope.gotoDetailPage =gotoDetailPage;

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/d");
        }

        function pageData() {

            SearchService.getSearchData(render);

            function render(response) {
                console.log(response);
                $scope.data = response;
            }

        }
    }

})();