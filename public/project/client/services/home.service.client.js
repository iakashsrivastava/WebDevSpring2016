/**
 * Created by akash on 3/4/16.
 */
(function(){
    angular
        .module('SocialMashup')
        .factory('HomeService',HomeService);

    function HomeService($http,$q){

        var api = {
            getData: getData,
            getEntertaintmentData:getEntertaintmentData
        };

        return api;

        function getData(){
            var deferred = $q.defer();

            $http.get('/api/project/home/content')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getEntertaintmentData(){
            var deferred = $q.defer();

            $http.get('/api/project/entertaintment/content')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

    }

})();