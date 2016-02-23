/**
 * Created by akash on 2/23/16.
 */


(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($routeParams, $http, $scope) {
        var imdbID = $routeParams.imdbID;
        console.log(imdbID);

        $http.get("http://www.omdbapi.com/?i="+imdbID)
            .success(render);


        function render(response){
            console.log(response);
            $scope.movie =response;
        }
    }

})();