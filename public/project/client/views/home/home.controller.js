/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("HomeController",HomeController);

    function HomeController(HomeService, $scope,$location,usSpinnerService,$rootScope) {

        $scope.gotoDetailPage =gotoDetailPage;
        $scope.getCategoryDetails=getCategoryDetails;
        $scope.getHomeContent=getHomeContent;
        $scope.categoryNext = categoryNext;
        $scope.categoryPrevious = categoryPrevious;
        $scope.getUserCategories = getUserCategories;


        function getUserCategories(){
            console.log('Hello');
            if($rootScope.loggedUser && $rootScope.loggedUser.categories.length>0) {
                    categoriesList1 = [];
                    categories = $rootScope.loggedUser.categories;
                    for (var i = 0; i < categories.length; i++) {
                        var obj = {name: categories[i], content: [], prev: -6, next: 0}
                        categoriesList1.push(obj);
                    }
                    $rootScope.categoriesList = categoriesList1;
            }
            else{
                $rootScope.categoriesList =
                    [{name :'Science', content: [], prev:-6,next:0},
                        {name :'News', content: [], prev:-6,next:0},
                        {name :'Entertainment', content: [], prev:-6,next:0},
                        {name :'Sports', content: [], prev:-6,next:0}];
            }
            console.log($rootScope.categoriesList);
        }


        function getCategoryDetails(category){
            $location.url("/category/"+category);
        }

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/F");
        }

        function getHomeContent(){

            for(var i=0; i<$rootScope.categoriesList.length; i++){
                HomeService.getCategoryContent($rootScope.categoriesList[i].name,$rootScope.categoriesList[i].next,i).then(
                    function(response){
                        var counter = response.counter;
                        $rootScope.categoriesList[counter].content = response.items;
                    });
                //$rootScope.categoriesList[i].next = $rootScope.categoriesList[i].next + 6;
            }
        }

        function categoryNext(category){

            for(var i=0; i<$rootScope.categoriesList.length; i++){

                if($rootScope.categoriesList[i].name === category){

                    $rootScope.categoriesList[i].prev = $rootScope.categoriesList[i].prev + 6;
                    $rootScope.categoriesList[i].next = $rootScope.categoriesList[i].next + 6;
                    HomeService.getCategoryContent($rootScope.categoriesList[i].name,$rootScope.categoriesList[i].next,i).then(
                        function(response){
                            var counter = response.counter;
                            $rootScope.categoriesList[counter].content = response.items;
                        });
                    break;
                    }
            }
        }

        function categoryPrevious(category){

            for(var i=0; i<$rootScope.categoriesList.length; i++){

                if($rootScope.categoriesList[i].name === category){

                    HomeService.getCategoryContent($rootScope.categoriesList[i].name,$rootScope.categoriesList[i].prev,i).then(
                        function(response){
                            var counter = response.counter;
                            $rootScope.categoriesList[counter].content = response.items;
                        });
                    $rootScope.categoriesList[i].next = $rootScope.categoriesList[i].next - 6;
                    $rootScope.categoriesList[i].prev = $rootScope.categoriesList[i].prev - 6;
                    break;
                }
            }
        }

    }

})();