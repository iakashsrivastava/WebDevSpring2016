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

        function getTrendsData(postId,callback){
            var deferred = $q.defer();
            $http.get('/api/content/trends/data')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

    }
})();