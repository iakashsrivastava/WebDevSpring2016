/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module('SocialMashup')
        .factory('SearchService',SearchService);

    function SearchService($http,$routeParams){

        var url ='https://api.dailymotion.com/videos?fields=id,thumbnail_url,title,&search=';
        var limit = '&limit=50';
        var api = {
            getSearchData: getSearchData
        };

        return api;

        function getSearchData(query,callback){
            $http.get(url + query+limit)
                .success(callback);
        }

    }
})();