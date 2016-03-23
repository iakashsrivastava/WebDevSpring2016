/**
 * Created by akash on 3/4/16.
 */
(function(){
    angular
        .module('SocialMashup')
        .factory('HomeService',HomeService);

    function HomeService($http,$q){

        var api = {
            getData: getData
        };

        return api;

        function getData(){
            var deferred = $q.defer();

            $http.get('/api/project/home/content')
                .success(function(response){
                    deferred.resolve(response);
                });

            (deferred.promise).then(
                function(response){
                    var x = [];
                    for(var i=0; i < response.length; i++) {
                        x.push( JSON.parse(response[i]).videos.data );
                    }
                    console.log(x);
                }
            );
        }

    }

})();