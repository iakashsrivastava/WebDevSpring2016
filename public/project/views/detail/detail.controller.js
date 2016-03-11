/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("DetailsController",DetailsController);

    function DetailsController(DetailService, $scope) {

        $scope.detailDataContent = detailDataContent;

        function detailDataContent() {

            DetailService.getDetailedData(render);

            function render(response) {
                console.data(response);
            }

        }
    }

})();