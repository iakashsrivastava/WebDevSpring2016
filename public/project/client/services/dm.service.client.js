/**
 * Created by akash on 3/11/16.
 */

(function(){
    angular
        .module('SocialMashup')
        .factory('DMDetailService',DMDetailService);

    function DMDetailService($http){
        var url ='https://api.dailymotion.com/video/';
        var options = '?fields=description,id,title,url,thumbnail_url';
        var api = {
            getDetailedData: getDetailedData
        };

        return api;

        function getDetailedData(query,callback){
            $http.get(url+query+options)
                .success(function(response){
                    var data = {
                        source :"//www.dailymotion.com/embed/video/"+response.id,
                        title: response.title,
                        description: response.description,
                        thumbnail_url: response.thumbnail_url
                        }
                    callback(data);
                });
        }

    }
})();