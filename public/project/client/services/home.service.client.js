/**
 * Created by akash on 3/4/16.
 */
(function(){
    angular
        .module('SocialMashup')
        .factory('HomeService',HomeService);

    function HomeService($http,$q){

        var api = {
            getCategoryDetails:getCategoryDetails,
            getCategoryContent:getCategoryContent
        };

        return api;

        function getCategoryContent(category,page,counter){
            var deferred = $q.defer();
            $http.get('/api/content/category/'+category +'/page/'+page)
                .success(function(response){
                    var content = {items :response,
                                    category: category,
                                    counter: counter};

                    deferred.resolve(content);
                });

            return deferred.promise;
        }

        function getCategoryDetails(category,page){
            var deferred = $q.defer();
            $http.get('/api/detail/category/'+category +'/page/'+page)
                .success(function(response){

                    deferred.resolve(response);
                });

            return deferred.promise;
        }

    }

})();



