/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("DetailsController",DetailsController);

    function DetailsController(DetailService,DMDetailService, $scope,$routeParams,$sce) {

        var postId = $routeParams.Id;
        var source = $routeParams.Source;

        function HomeDataContent() {

            DetailService.getDetailedData(postId,render);


            function render(response) {
                console.log(source);
                $scope.data = response;
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
        }

        function SearchDataContent() {

            DMDetailService.getDetailedData(postId,render);

            function render(response) {
                console.log(source);
                $scope.data = response;
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }


        }

        if(source === 'F')
            HomeDataContent();
        else
            SearchDataContent();


    }

})();