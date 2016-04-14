/**
 * Created by akash on 3/4/16.
 */
(function(){
    angular
        .module('SocialMashup')
        .factory('HomeService',HomeService);

    function HomeService($http,$q,SearchService){

        var api = {
            getCategoryDetails:getCategoryDetails,
            getCategoryContent:getCategoryContent
        };

        return api;

        function getCategoryContent(category,page,counter){
            var deferred = $q.defer();
            $http.get('/api/content/category/'+category +'/page/'+page)
                .success(function(response){
                    var content={};
                    if(response.length ==0){
                        console.log(category);
                        SearchService.getSearchDataforHomeContent(category,page,render);

                        function render(response) {
                            //$scope.data = response.list;
                            console.log(response.list);
                            items =[]
                            for(var k=0; k<6;k++){
                                var obj ={
                                    id: response.list[k].id,
                                    picture: response.list[k].thumbnail_url,
                                    title: response.list[k].title
                                }
                                items.push(obj);
                            }

                            content ={
                                items: items,
                                category: category,
                                counter:counter
                            }
                            deferred.resolve(content);
                        }
                    }
                    else {
                        content = {

                            items: response,
                            category: category,
                            counter: counter
                        };
                        deferred.resolve(content);
                    }
                    //deferred.resolve(content);
                });

            return deferred.promise;
        }

        function getCategoryDetails(category,page){
            var deferred = $q.defer();
            $http.get('/api/detail/category/'+category +'/page/'+page)
                .success(function(response){
                    if(response.length ==0){
                        console.log(category);
                        SearchService.getSearchDataforDetailContent(category,page,render);

                        function render(response) {
                            //$scope.data = response.list;
                            console.log(response.list);
                            items =[]
                            for(var k=0; k<30;k++){
                                var obj ={
                                    id: response.list[k].id,
                                    picture: response.list[k].thumbnail_url,
                                    title: response.list[k].title
                                }
                                items.push(obj);
                            }
                            deferred.resolve(items);
                        }
                    }
                    else
                        deferred.resolve(response);
                    //deferred.resolve(content);
                });

            return deferred.promise;
        }

    }

})();



