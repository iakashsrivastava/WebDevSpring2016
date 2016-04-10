/**
 * Created by akash on 4/6/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("TrendingController",TrendingController);

    function TrendingController(TrendsService,$scope,$rootScope,$location,$window,$sce){
        $scope.popularTweets ='';
        $scope.loadTrends = loadTrends;
        $scope.getTopicTweets =getTopicTweets;
        var count =0;

        $scope.locationsList =
            [{location :'Worldwide', content: [], prev:-6,next:0},
                {location :'India', content: [], prev:-6,next:0},
                {location :'Worldwide', content: [], prev:-6,next:0},
                {location :'India', content: [], prev:-6,next:0},
                {location :'Worldwide', content: [], prev:-6,next:0},
                {location :'India', content: [], prev:-6,next:0}
                //{location :'Delhi', content: [], prev:-6,next:0},
                //{location :'Mumbai', content: [], prev:-6,next:0},
                //{location :'Chennai', content: [], prev:-6,next:0},
                //{location :'Pune', content: [], prev:-6,next:0}
                ];

        $scope.timeStamps = ['Trending Now'];

        loadTrends();

        function loadTrends() {
            console.log('loadTrends');
            for (var i = count; i < count+2; i++) {
                TrendsService.getTopLocationTrends($scope.locationsList[i].location,i).then(
                    function (response) {
                        var counter = response.counter;
                        $scope.locationsList[counter].content = response.content;
                        console.log('loadTrends ' + response.content.length);
                    });
            }
            count = count+2;
        }

        function getTopicTweets(location, topic){
            TrendsService.getTopicTweets(location,topic).then(
                function (response) {
                    $scope.popularTweets = response;
                });
        }

        angular.element($window).bind("scroll", function() {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                loadTrends();
            }
        });

        function gotoURL(url){

            $location.url(url, '_blank');
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsHtml(src);
        }





    }


})();