/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("DetailsController",DetailsController);

    function DetailsController(DetailService,DMDetailService, $scope,$routeParams,$sce,ArticleService,$rootScope,$location,$timeout) {

        var loggedUser = $rootScope.loggedUser;
        var postId = $routeParams.Id;
        var source = $routeParams.Source;

        $scope.forWeb = {"height":"465px"};
        $scope.showShare =false;


        if(loggedUser)
            $scope.userLoggedIn = true;
        else
            $scope.userLoggedIn = false;


        $scope.favorite=favorite;
        $scope.addComment =addComment;
        $scope.displayshareIcons = displayshareIcons;

        function displayshareIcons(){
            $scope.showShare =true;
        }

        function getComments(){
            ArticleService
                .findArticleById(postId)
                .then(function(response){
                    if(response.data)
                        $scope.comments = response.data.comments;
                    else {
                        $scope.comments = [];
                    }
                    $scope.commentsLength = $scope.comments.length;

                    if($scope.commentsLength === 0)
                        $scope.noComment = true
                    else
                        $scope.noComment = false;
                });

        }

        getComments();
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
                    console.log(response.data);
                    $scope.article = response.data;
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
                    $scope.article = response.data;
                });
        }

        if(source === 'F')
            HomeDataContent();
        else
            SearchDataContent();

        function favorite(article1) {
            if(loggedUser) {
                var article ={};
                $scope.article = {};
                $scope.article.likes = [];
                $scope.article.likes.push(loggedUser._id);
                article.likes=[];
                article.likes.push(loggedUser._id);
                article.articleId = postId;
                article.title= $scope.data.title;
                article.source= source;
                article.description=$scope.data.description;
                if(source === 'F')
                    article.thumbnail_url = $scope.data.picture
                else
                    article.thumbnail_url=$scope.data.thumbnail_url;

                ArticleService
                    .userLikesArticle(loggedUser._id, article);
            } else {
                $location.url("/login");
            }
        }

        function addComment(comment) {
            if(loggedUser) {
                var article ={};
                $scope.comments.push({id :loggedUser._id,
                                        comments: comment,
                                        name:loggedUser.firstName})
                $scope.noComment = false;

                article.comments = [];
                article.comments.push(
                                        {id :loggedUser._id,
                                            comments: comment,
                                        name:loggedUser.firstName});
                article.likes=[];
                article.articleId = postId;
                article.title= $scope.data.title;
                article.source= source;
                article.description=$scope.data.description;
                article.thumbnail_url='';
                ArticleService
                    .userCommentsOnArticle(loggedUser._id, article);

                //getComments();
            } else {
                $location.url("/login");
            }
        }

    }

})();