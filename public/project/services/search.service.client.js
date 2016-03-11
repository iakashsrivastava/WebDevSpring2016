/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module('SocialMashup')
        .factory('SearchService',SearchService);

    function SearchService($http){

        var url ='https://api.dailymotion.com/videos?fields=id,thumbnail_url,title,&search=';

        var api = {
            getSearchData: getSearchData
        };

        return api;

        function getSearchData(query,callback){
            $http.get(url + query)
                .success(callback);
        }

    }
})();