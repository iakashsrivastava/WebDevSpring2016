/**
 * Created by akash on 3/10/16.
 */
/**
 * Created by akash on 3/4/16.
 */
(function(){
    angular
        .module('SocialMashup')
        .factory('DetailService',DetailService);

    function DetailService($http){

        var api = {
            getDetailedData: getDetailedData
        };

        return api;

        function getDetailedData(callback){
            $http.get('https://graph.facebook.com/696303527177824?fields=description,source,title&access_token=1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360')
                .success(callback);
        }

    }
})();