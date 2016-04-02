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
        $scope.isModalVisible = false;
        $scope.turnModalOff = turnModalOff;
        $scope.viewModal =viewModal;

        $scope.colors = {Blue: true, Orange: true};

        var categoriesList =['Science','Sports','News'];

        $scope.categories =[];

        function getCategoryDetails(category){
            $location.url("/category/"+category);
        }

        function viewModal(){
            $scope.isModalVisible = true;
        }

        function gotoDetailPage(id){
            $location.url("/details/"+id+"/F");
        }

        function getHomeContent(){
            for(var i=0; i<categoriesList.length; i++){
                HomeService.getCategoryContent(categoriesList[i]).then(
                    function(response){
                        $scope.categories.push({
                            items : response.item,
                            name : response.name
                        });
                    });
            }
        }

        function turnModalOff(){
            $scope.isModalVisible = false;
        }


    }

})();