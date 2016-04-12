/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("DetailsController",DetailsController);

    function DetailsController(DetailService,DMDetailService, $scope,$routeParams,$sce,ArticleService,$rootScope,$location) {

        var loggedUser = $rootScope.loggedUser;
        var postId = $routeParams.Id;
        var source = $routeParams.Source;

        $scope.favorite=favorite;

        function HomeDataContent() {

            DetailService.getDetailedData(postId,render);

            function render(response) {
                console.log(source);
                $scope.data = response;
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            ArticleService
                .findUserLikes (postId)
                .then(function(response){
                    console.log(response);
                });
        }

        function SearchDataContent() {

            DMDetailService.getDetailedData(postId,render);

            function render(response) {
                console.log(source);
                $scope.data = response;
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            ArticleService
                .findUserLikes (postId)
                .then(function(response){
                    console.log(response);
                });


        }

        if(source === 'F')
            HomeDataContent();
        else
            SearchDataContent();

        function favorite(article) {
            if(loggedUser) {
                //vm.movie.likes = [];
                //vm.movie.likes.push(loggedUser._id);
                ArticleService
                    .userLikesArticle(loggedUser._id, article);
            } else {
                $location.url("/login");
            }
        }

    }

})();