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
        var page = '&page='
        var api = {
            getSearchData: getSearchData,
            getSearchDataforHomeContent:getSearchDataforHomeContent
        };
        var userCategory=[];

        return api;

        function getSearchData(category,callback){
            console.log(category);
            $http.get(url + category+limit)
                .success(callback);
        }

        function getSearchDataforHomeContent(category,counter,callback){
            counter = counter/6 +1;
            console.log(url + category + page + limitforHomeContent);
            $http.get(url + category + page + counter+limitforHomeContent)
                .success(callback);
        }

    }
})();