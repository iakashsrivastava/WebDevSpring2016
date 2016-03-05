/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("HomeController",HomeController);

    function HomeController(HomeService, $scope){

        $scope.CarouselDemoCtrl=CarouselDemoCtrl;

        function CarouselDemoCtrl() {

            HomeService.getTrendingTopics(render);

            function render(response){

                var videosObj = response.videos.data;

                angular.forEach(videosObj,function(item,index){

                    $scope.addSlide(item);

                });
            }



            var slides = $scope.slides = [];

            $scope.addSlide = function(item) {
                var newWidth = 600 + slides.length;
                slides.push({
                    image: item.picture,
                    text: item.title
                });

            };

            for (var i=0; i<4; i++) {
                $scope.addSlide();
            }
        }



    }


})();