/**
 * Created by akash on 3/4/16.
 */
(function(){
    angular
        .module('SocialMashup')
        .factory('HomeService',HomeService);

    var myvar=[];
    var promiseArray = [];
    var data;
    var urls =['https://graph.facebook.com/407570359384477/?fields=videos{picture,title}&access_token=1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360'];


    function HomeService($http,$q){

        var api = {
            getTrendingTopics: getTrendingTopics
        };

        return api;

        function getTrendingTopics(callback){
            console.log("Hi1");

            for(var i=0; i < urls.length; i++) {
                var url = urls[i];
                promiseArray.push($http.get(url).success(function (response) {
                    data = response;
                }));
            }

            $q.all(promiseArray).then(function () {
                console.log("hi2");
                callback(data);
            })
        }

    }
})();