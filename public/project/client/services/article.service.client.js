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
            findUserLikes: findUserLikes
        };
        return api;

        function findUserLikes (articleId) {
            console.log('ddefefew');
            return $http.get("/api/project/article/"+articleId+"/user");
        }

        function userLikesArticle(userId, article) {
            return $http.post("/api/project/user/"+userId+"/article/"+article.articleId, article);
        }
    }
})();