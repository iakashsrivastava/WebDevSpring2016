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
        var limitforHomeContent = '&limit=6';
        var limitforDetailContent = '&limit=30';
        var page = '&page='
        var api = {
            getSearchData: getSearchData,
            getSearchDataforHomeContent:getSearchDataforHomeContent,
            getSearchDataforDetailContent:getSearchDataforDetailContent
        };
        var userCategory=[];

        return api;

        function getSearchData(category,callback){

            $http.get(url + category+limit)
                .success(callback);
        }

        function getSearchDataforHomeContent(category,counter,callback){
            counter = counter/6 +1;
            $http.get(url + category + page + counter+limitforHomeContent)
                .success(callback);
        }

        function getSearchDataforDetailContent(category,counter,callback){
            counter = counter/30 +1;
            $http.get(url + category + page + counter+limitforDetailContent)
                .success(callback);
        }

    }
})();