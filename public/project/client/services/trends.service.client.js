/**
 * Created by akash on 4/6/16.
 */

(function(){
    angular
        .module('SocialMashup')
        .factory('TrendsService',TrendsService);

    function TrendsService($http , $q){

        var api = {
            getTrendsData: getTrendsData,
            getTopLocationTrends:getTopLocationTrends,
            getTopicTweets:getTopicTweets
        };

        return api;

        function getTrendsData(location,page,counter){
            var deferred = $q.defer();
            $http.get('/api/content/trends/'+location)
                .success(function(response){
                    var obj = {
                        content :response,
                        counter : counter

                    }
                    deferred.resolve(obj);
                });

            return deferred.promise;
        }

        function getTopLocationTrends(location,counter){
            var deferred = $q.defer();
            console.log('Inside getTopLocationTrends service');
            $http.get('/api/content/trends/top/'+location)
                .success(function(response){
                    var obj = {
                        content :response,
                        counter : counter
                    }
                    deferred.resolve(obj);
                });

            return deferred.promise;
        }

        function getTopicTweets(location , topic){

            var deferred = $q.defer();
            hash ='#';
            url ='';
            if (topic.indexOf(hash) > -1){
                topic = topic.replace('#','');
                url = '/api/content/location/' + location + '/topicwithhash/' +topic;
            }
            else
                url = '/api/content/location/' + location + '/topic/' +topic;

            $http.get(url)
                .success(function(response){
                    for(var i=0;i<response.length;i++){

                    }
                    deferred.resolve(response);
            });

        return deferred.promise;
    }
    }
})();
