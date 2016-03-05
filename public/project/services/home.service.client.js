/**
 * Created by akash on 3/4/16.
 */
(function(){
    angular
        .module('SocialMashup')
        .factory('HomeService',HomeService);

    function HomeService($http){

        var api = {
            getTrendingTopics: getTrendingTopics
        };

        return api;

        function getTrendingTopics(callback){
            $http.get("https://graph.facebook.com/407570359384477/?fields=videos{picture,title}&access_token=1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360")
                .success(callback);
        }
    }
})();