/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("HomeController",HomeController);

    function HomeController(HomeService, $scope,$location,usSpinnerService) {

        $scope.gotoDetailPage =gotoDetailPage;
        $scope.getCategoryDetails=getCategoryDetails;
        $scope.getHomeContent=getHomeContent;
        $scope.categoryNext = categoryNext;
        $scope.categoryPrevious = categoryPrevious;

        $scope.categoriesList =[{name :'Science', page:0, content: [], prev:-6,next:0},
                            {name :'News', page:0, content: [], prev:-6,next:0},
                            {name :'Entertainment', page:0, content: [], prev:-6,next:0},
                            {name :'Sports', page:0, content: [], prev:-6,next:0}];

        function getCategoryDetails(category){
            $location.url("/category/"+category);
        }

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/F");
        }

        function getHomeContent(){

            for(var i=0; i<$scope.categoriesList.length; i++){
                HomeService.getCategoryContent($scope.categoriesList[i].name,$scope.categoriesList[i].next,i).then(
                    function(response){
                        var counter = response.counter;
                        $scope.categoriesList[counter].content = response.items;
                    });
                $scope.categoriesList[i].next = $scope.categoriesList[i].next + 6;
            }
        }

        function categoryNext(category){

            for(var i=0; i<$scope.categoriesList.length; i++){

                if($scope.categoriesList[i].name === category){

                    HomeService.getCategoryContent($scope.categoriesList[i].name,$scope.categoriesList[i].next,i).then(
                        function(response){
                            var counter = response.counter;
                            $scope.categoriesList[counter].content = response.items;
                        });
                    $scope.categoriesList[i].prev = $scope.categoriesList[i].prev + 6;
                    $scope.categoriesList[i].next = $scope.categoriesList[i].next + 6;
                    break;
                    }
            }
        }

        function categoryPrevious(category){

            for(var i=0; i<$scope.categoriesList.length; i++){

                if($scope.categoriesList[i].name === category){

                    HomeService.getCategoryContent($scope.categoriesList[i].name,$scope.categoriesList[i].prev,i).then(
                        function(response){
                            var counter = response.counter;
                            $scope.categoriesList[counter].content = response.items;
                        });
                    $scope.categoriesList[i].prev = $scope.categoriesList[i].prev - 6;
                    $scope.categoriesList[i].next = $scope.categoriesList[i].next - 6;
                    break;
                }
            }
        }

    }

})();