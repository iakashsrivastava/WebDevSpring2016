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
            getEntertainmentData:getEntertainmentData,
            getScienceData:getScienceData,
            getSportsData:getSportsData,
            getCategoryDetails:getCategoryDetails,
            getCategoryContent:getCategoryContent
        };

        return api;

        function getData(){
            var deferred = $q.defer();

            $http.get('/api/content/category/:news')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getSportsData(){
            var deferred = $q.defer();

            $http.get('/api/content/category/:news')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getEntertainmentData(){
            var deferred = $q.defer();

            $http.get('/api/content/category/:entertainment')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getScienceData(){
            var deferred = $q.defer();
            console.log("client service");
            $http.get('/api/content/category/:science')
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getCategoryContent(category){
            var deferred = $q.defer();
            $http.get('/api/content/category/:'+category)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getCategoryDetails(category){
            var deferred = $q.defer();

            $http.get('/api/category/detail/:'+category)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

    }

})();



