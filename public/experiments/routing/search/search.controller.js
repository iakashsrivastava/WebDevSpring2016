/**
 * Created by akash on 2/23/16.
 */
(function(){
    angular
        .module('MovieApp')
        .controller("SearchController",searchController);

    function searchController(MovieService,$scope,$http,$routeParams,$location){

        var title = $routeParams.title;

        if(title){
            search(title);
        }

        $scope.search = search;

        function search(title){
            $location.url('/search/'+title);
            console.log(title);
            MovieService.findMoviesByTitle(title,render);
            //$http.get("http://www.omdbapi.com/?s="+title)
            //    .success(render);

        }

        function render(response){
            console.log(response);
            $scope.data= response;
        }

    }
})();