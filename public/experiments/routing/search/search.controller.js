/**
 * Created by akash on 2/23/16.
 */
(function(){
    angular
        .module('MovieApp')
        .controller("SearchController",searchController);

    function searchController($scope,$http){

        $scope.search = search;

        function search(title){

            console.log(title);
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(render);

        }

        function render(response){
            console.log(response);
            $scope.data= response;
        }

    }
})();