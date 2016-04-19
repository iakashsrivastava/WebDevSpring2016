/**
 * Created by akash on 4/18/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("FollowerController",FollowerController);

    function FollowerController($routeParams,$scope,UserService,ArticleService,$location) {
        var id = $routeParams.id;

        $scope.showComments  = false;
        $scope.showCommentsDiv = showCommentsDiv;

        $scope.showLikes =false;
        $scope.showLikesDiv = showLikesDiv;

        function showLikesDiv($event){
            if ($scope.showLikes == true){
                $scope.showComments =false;
                $scope.showLikes =false;
            }
            else{
                showLikedvideos();
                $scope.showComments =false;
                $scope.showLikes =true;
            }
        }

        function showCommentsDiv($event){
            if ($scope.showComments == true){
                $scope.showComments =false;
                $scope.showLikes =false;
            }
            else{
                showCommentedvideos();
                $scope.showComments =true;
                $scope.showLikes =false;
            }
        }

        function getUserDetails(){
            UserService.findAllUsers().then(
                function(response){
                    allUsers=response;
                    for(var k=0; k<allUsers.length; k++){
                        if(allUsers[k]._id === id) {
                            $scope.user = allUsers[k];
                            getUserCommentedArticles(allUsers[k]);
                            getUserLikedArticles(allUsers[k]);
                        }
                    }

                },
                function(err) {
                    $scope.error = err;
                }
            );
        }
        getUserDetails();

        $scope.userCommentedArticles =[];
        function getUserCommentedArticles(user1){
            var userComments = user1.comments;
            for(var i=0; i<userComments.length; i++){
                ArticleService
                    .findArticleById (userComments[i])
                    .then(function(response){
                        $scope.userCommentedArticles.push(response.data);
                    });
            }
        }
        var commentsCount =0;

        $scope.showCommentedvideos =showCommentedvideos;

        function showCommentedvideos(){
            $scope.userCommentedData =[];
            for(var i=commentsCount; i<commentsCount+6; i++){
                $scope.userCommentedData.push($scope.userCommentedArticles[i]);
            }
            showCommentNext();
            showCommentprev();
        }

        $scope.commentNextButton =true;
        function showCommentNext(){
            for(var i=commentsCount; i<commentsCount+6; i++){
                if($scope.userCommentedData[i] === undefined)
                    $scope.commentNextButton =false;
                else
                    $scope.commentNextButton =true;
            }
        }

        $scope.commentPrevButton =false;
        function showCommentprev(){
            if(commentsCount< 6)
                $scope.commentPrevButton =false;
            else
                $scope.commentPrevButton = true;
        }

        $scope.commentNext =commentNext;
        function commentNext($event){
            $event.stopImmediatePropagation();
            commentsCount = commentsCount+6;
            showCommentedvideos();
        }

        $scope.commentPrev =commentPrev;
        function commentPrev($event){
            $event.stopImmediatePropagation();
            commentsCount = commentsCount-6;
            showCommentedvideos();
        }

        $scope.userLikesArticles =[];
        function getUserLikedArticles(user1){
            var userLikes = user1.likes;
            for(var i=0; i<userLikes.length; i++){
                ArticleService
                    .findArticleById (userLikes[i])
                    .then(function(response){
                        $scope.userLikesArticles.push(response.data);
                    });
            }
        }

        var likesCount =0;

        function showLikedvideos(){
            $scope.userLikesData =[];
            for(var i=likesCount; i<likesCount+6; i++){
                $scope.userLikesData.push($scope.userLikesArticles[i]);
            }
            showLikeNext();
            LikePrevButton();
        }

        $scope.LikeNextButton =true;
        function showLikeNext(){
            for(var i=likesCount; i<likesCount+6; i++){
                if($scope.userLikesData[i] === undefined)
                    $scope.LikeNextButton =false;
                else
                    $scope.LikeNextButton =true;
            }
        }

        $scope.LikePrevButton =false;
        function LikePrevButton(){
            if(likesCount< 6)
                $scope.LikePrevButton =false;
            else
                $scope.LikePrevButton = true;
        }

        $scope.categoryNext =categoryNext;
        function categoryNext($event){
            $event.stopImmediatePropagation();
            likesCount = likesCount+6;
            showLikedvideos();
        }

        $scope.categoryPrev =categoryPrev;
        function categoryPrev($event){
            $event.stopImmediatePropagation();
            likesCount = likesCount-6;
            showLikedvideos();
        }

        $scope.gotoDetailPage =gotoDetailPage;
        function gotoDetailPage(id,source){
            console.log(id + source);
            if(source === 'F')
                $location.url("/details/"+id+"/F");
            else
                $location.url("/details/"+id+"/d");
        }



    }

})();