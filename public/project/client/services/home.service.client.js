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
            getEntertaintmentData:getEntertaintmentData,
            getScienceData:getScienceData,
            getSportsData:getSportsData

        };

        return api;

        function getData(){
            var deferred = $q.defer();

            $http.get('/api/category/news/content')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getEntertaintmentData(){
            var deferred = $q.defer();

            $http.get('/api/category/entertaintment/content')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getScienceData(){
            var deferred = $q.defer();
            console.log("client service");
            $http.get('/api/category/science/content')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getSportsData(){
            var deferred = $q.defer();

            $http.get('/api/category/sports/content')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

    }

})();