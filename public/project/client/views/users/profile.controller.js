/**
 * Created by akash on 2/23/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$scope,$rootScope,ArticleService,$location){

        $scope.profile = $rootScope.loggedUser;
        $scope.update = update;
        $scope.updateCategory = updateCategory;
        $scope.addNewCategory =addNewCategory;
        $scope.removeCategory =removeCategory;
        $scope.print = print;
        $scope.undoCategory = undoCategory;
        $scope.gotoDetailPage=gotoDetailPage;
        $scope.following = $rootScope.loggedUser.following;

        $scope.isComment =true;
        $scope.isLike = true;

        $scope.showProfile = false;
        $scope.showProfileDiv = showProfileDiv;

        $scope.showCategories =false;
        $scope.showCategoriesDiv = showCategoriesDiv;

        $scope.showLikes =false;
        $scope.showLikesDiv = showLikesDiv;

        $scope.showComments =false;
        $scope.showCommentsDiv = showCommentsDiv;

        $scope.showFollowing =false;
        $scope.showFollowingDiv = showFollowingDiv;

        function anyfollowing() {
            if ($rootScope.loggedUser.following.length > 0)
                $scope.isFollowing = true;
            else
                $scope.isFollowing = false;
        }
        anyfollowing();
        $scope.gotoLikedUserpage =gotoLikedUserpage;

        function gotoLikedUserpage(id){
            $location.url("/user/"+id);
        }

        function showFollowingDiv(){
            if ($scope.showFollowing == true){
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
            else{
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = true;
            }
        }

        function showProfileDiv(){
            if ($scope.showProfile == true){
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
            else{
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = true;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
        }

        function showCategoriesDiv(){
            if ($scope.showCategories == true){
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
            else{
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =true;
                $scope.showFollowing = false;
            }
        }

        function showLikesDiv($event){
            if ($scope.showLikes == true){
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
            else{
                showLikedvideos();
                $scope.showComments =false;
                $scope.showLikes =true;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
        }

        function showCommentsDiv($event){
            if ($scope.showComments == true){
                $scope.showComments =false;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
            else{
                showCommentedvideos();
                $scope.showComments =true;
                $scope.showLikes =false;
                $scope.showProfile = false;
                $scope.showCategories =false;
                $scope.showFollowing = false;
            }
        }

        function update(loggedUser) {

            UserService.updateUser(loggedUser._id,loggedUser).then(
                function(response){
                    console.log(response);
                    //$rootScope.loggedUser = response;
                      //  $scope.loggedUser = loggedUser;

                    },
                function(err) {
                    $scope.error = err;
                }
            );
        }

        function loadUserCategories(){
            var categoryList = $rootScope.loggedUser.categories;

            if(categoryList.length>0){
                var userCategories =[];
                for( var j=0; j<categoryList.length ;j++){
                    var obj = {
                        name: categoryList[j],
                        selected: true,
                        position: j+1,
                        color:{}
                    }
                    console.log(obj);
                    userCategories.push(obj);
                }
                $scope.categories = userCategories;
            }
            else{
                $scope.categories = [
                    { name: 'News',    selected: true, position: 1, color:{} },
                    { name: 'Science',   selected: true, position: 2, color:{} },
                    { name: 'Entertainment',     selected: true,position: 3, color:{} },
                    { name: 'Sports', selected: true, position: 4, color:{} }
                ];
            }
        }
        loadUserCategories();

        // selected fruits
        $scope.selection = [];


        // helper method to get selected fruits
        $scope.selectedCategories = function selectedCategories() {
            return filterFilter($scope.categories, { selected: true });
        };

        // watch fruits for changes
        $scope.$watch('categories|filter:{selected:true}', function (nv) {
            $scope.selection = nv.map(function (category) {
                return category.name;
            });
        }, true);

        function updateCategory() {
            //console.log($rootScope.loggedUser);
            $rootScope.loggedUser.categories = $scope.selection;
            console.log($scope.selection);
            UserService.updateUser($rootScope.loggedUser._id,$rootScope.loggedUser).then(
                function(response){
                    //$rootScope.loggedUser = response;
                    //$scope.loggedUser = response;
                },
                function(err) {
                    $scope.error = err;
                }
            );
        }

        function addNewCategory(newUserCategory){
            if(newUserCategory){
                $scope.hasError='';
                var newCategory ={
                    name: newUserCategory,
                    selected: true,
                    position: $scope.categories.length +1,
                    color:{}
                }
                $scope.categories.push(newCategory);
                $scope.newCategory='';
            }
            else{
                $scope.hasError='has-error';
            }
        }

        function removeCategory(category){
            for(var j=0; j<$scope.categories.length; j++){
                if(category === $scope.categories[j].name) {
                    $scope.categories[j].selected = false;
                    $scope.categories[j].color = {"color": "red"};
                }
            }
        }

        function undoCategory(category){
            for(var j=0; j<$scope.categories.length; j++){
                if(category === $scope.categories[j].name) {
                    $scope.categories[j].selected = true;
                    $scope.categories[j].color = {};
                }
            }
        }

        function print(){
            console.log(JSON.stringify($scope.categories));
            console.log(JSON.stringify($scope.selection));
        }

        function gotoDetailPage(id,source){
            console.log(id + source);
            if(source === 'F')
                $location.url("/details/"+id+"/F");
            else
                $location.url("/details/"+id+"/d");
        }

        var userLikesArticles =[];
        function getUserLikedArticles(){
            var userLikes = $rootScope.loggedUser.likes;
            for(var i=0; i<userLikes.length; i++){
                ArticleService
                    .findArticleById (userLikes[i])
                    .then(function(response){
                        userLikesArticles.push(response.data);
                    });
            }
            console.log(userLikes);
        }
        getUserLikedArticles();
        var likesCount =0;

        function showLikedvideos(){
            $scope.userLikesData =[];
            for(var i=likesCount; i<likesCount+6; i++){
                if(userLikesArticles[0] === undefined){
                    $scope.isLike = false;
                }
                $scope.userLikesData.push(userLikesArticles[i]);
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

        var userCommentedArticles =[];
        function getUserCommentedArticles(){
            var userComments = $rootScope.loggedUser.comments;
            for(var i=0; i<userComments.length; i++){
                ArticleService
                    .findArticleById (userComments[i])
                    .then(function(response){
                        userCommentedArticles.push(response.data);
                    });
            }
        }
        getUserCommentedArticles();
        var commentsCount =0;

        function showCommentedvideos(){
            $scope.userCommentedData =[];
            for(var i=commentsCount; i<commentsCount+6; i++){
                if(userCommentedArticles[0] === undefined){
                    $scope.isComment = false;
                }
                $scope.userCommentedData.push(userCommentedArticles[i]);
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
    }
})();