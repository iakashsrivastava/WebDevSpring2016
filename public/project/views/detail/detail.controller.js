/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("DetailsController",DetailsController);

    function DetailsController(DetailService, $scope,$routeParams,$sce) {

        function detailDataContent() {
            var postId = $routeParams.Id;

            DetailService.getDetailedData(postId,render);


            function render(response) {

                console.log(response);
                $scope.trustSrc
                $scope.data = response;
            }

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }


        }

        detailDataContent();
    }

})();