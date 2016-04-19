/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("DetailsController",DetailsController);

    function DetailsController(UserService,DetailService,DMDetailService, $scope,$routeParams,$sce,ArticleService,$rootScope,$location,$timeout) {

        var loggedUser = $rootScope.loggedUser;
        var postId = $routeParams.Id;
        var source = $routeParams.Source;

        $scope.forWeb = {"height":"465px"};
        $scope.showShare =false;
        $scope.likedByUsers = [];

        $scope.gotoLikedUserpage =gotoLikedUserpage;

        function gotoLikedUserpage(id){
            $location.url("/user/"+id);
        }


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
                    if(response.data) {
                        $scope.comments = response.data.comments;
                    }
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

        function getLikes(){
            ArticleService
                .findArticleById(postId)
                .then(function(response){
                    if(response.data) {
                        var ldata = response.data.likes;
                        ldata = ldata.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
                        for(var j=0; j<ldata.length; j++)
                            getUsersThatLikesArticle(ldata[j]);
                    }
                    else {
                        $scope.likedByUsers = [];
                    }
                    $scope.likedByUsersLength = $scope.likedByUsers.length;

                    if($scope.likedByUsersLength === 0)
                        $scope.noLike = true
                    else
                        $scope.noLike = false;
                });
        }
        getLikes();

        getComments();

        function getUsersThatLikesArticle(id){
            UserService.findAllUsers().then(
                function(response){
                    allUsers=response;
                    for(var k=0; k<allUsers.length; k++){
                        if(allUsers[k]._id === id)
                            $scope.likedByUsers.push({
                                id: allUsers[k]._id,
                                name: allUsers[k].firstName});
                        }

                },
                function(err) {
                    $scope.error = err;
                }
            );
        }

        function HomeDataContent() {

            DetailService.getDetailedData(postId,render);

            function render(response) {
                $scope.data = response;
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            ArticleService
                .findUserLikes (postId)
                .then(function(response){
                    $scope.article = response.data;
                    console.log(response.data)
                });
        }

        function SearchDataContent() {

            DMDetailService.getDetailedData(postId,render);

            function render(response) {
                $scope.data = response;
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            ArticleService
                .findUserLikes (postId)
                .then(function(response){
                    $scope.article = response.data;
                    console.log($scope.article);
                });
        }

        if(source === 'F')
            HomeDataContent();
        else
            SearchDataContent();

        function favorite(article1) {
            if(loggedUser) {
                $scope.likedByUsers.push({
                    id: '',
                    name: loggedUser.firstName});

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
                    article.thumbnail_url = $scope.data.picture;
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
                if(comment != undefined && comment.length >1) {

                    var article = {};
                    $scope.comments.push({
                        id: loggedUser._id,
                        comments: comment,
                        name: loggedUser.firstName
                    })
                    $scope.noComment = false;

                    article.comments = [];
                    article.comments.push(
                        {
                            id: loggedUser._id,
                            comments: comment,
                            name: loggedUser.firstName
                        });
                    article.likes = [];
                    article.articleId = postId;
                    article.title = $scope.data.title;
                    article.source = source;
                    article.description = $scope.data.description;
                    if(source === 'F')
                        article.thumbnail_url = $scope.data.picture
                    else
                        article.thumbnail_url=$scope.data.thumbnail_url;
                    ArticleService
                        .userCommentsOnArticle(loggedUser._id, article);

                    $scope.comment = '';
                }
                //getComments();
            } else {
                $location.url("/login");
            }
        }

    }

})();