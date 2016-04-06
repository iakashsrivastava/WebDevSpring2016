/**
 * Created by akash on 4/6/16.
 */

(function(){
    angular
        .module('SocialMashup')
        .factory('TrendsService',TrendsService);

    function TrendsService($http , $q){

        var api = {
            getTrendsData: getTrendsData
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

    }
})();