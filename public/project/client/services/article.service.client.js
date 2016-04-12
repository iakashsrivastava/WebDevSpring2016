/**
 * Created by akash on 4/11/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .factory("ArticleService", ArticleService);

    function ArticleService($http) {
        var api = {
            userLikesArticle: userLikesArticle,
            findUserLikes: findUserLikes,
            userCommentsOnArticle:userCommentsOnArticle,
            findArticleById:findArticleById
        };
        return api;

        function findUserLikes (articleId) {
            return $http.get("/api/project/article/"+articleId+"/user");
        }

        function userLikesArticle(userId, article) {
            return $http.post("/api/project/user/"+userId+"/article/"+article.articleId, article);
        }

        function userCommentsOnArticle(userId, article){
            console.log(article);
            return $http.post("/api/project/user/"+userId+"/comment/article/"+article.articleId, article);
        }

        function findArticleById(articleId) {
            return $http.get("/api/project/article/details/"+articleId);
        }
    }
})();