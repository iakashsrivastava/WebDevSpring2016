/**
 * Created by akash on 4/6/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("TrendsController",TrendsController);

    function TrendsController(TrendsService,$scope,$rootScope,$location,$window){

        $scope.loadTrends = loadTrends;
        $scope.changeColor = changeColor;
        $scope.noBackground = noBackground;
        var count =0;

        $scope.locationsList =
            [{location :'Worldwide', content: [], prev:-6,next:0},
                {location :'India', content: [], prev:-6,next:0},
                {location :'Delhi', content: [], prev:-6,next:0},
                {location :'Mumbai', content: [], prev:-6,next:0},
                {location :'Chennai', content: [], prev:-6,next:0},
                {location :'Pune', content: [], prev:-6,next:0}];

        $scope.timeStamps = ['Trending Now','15 Minutes Ago', '1 Hour Ago', '2 Hour Ago']

        loadTrends();

        function loadTrends() {
            for (var i = count; i < count+2; i++) {
                TrendsService.getTrendsData($scope.locationsList[i].location,0,i).then(
                    function (response) {
                        var counter = response.counter;
                        $scope.locationsList[counter].content = response.content;
                    });
            }
            count = count+2;
        }

        function changeColor(name,index){
            var content = $scope.locationsList[index].content;
            for(var i=0 ;i<content.length; i++){
                //console.log(content[i])
                for(var j=0; j< content[i].length;j++){
                    if (content[i][j].name == name)
                        $scope.locationsList[index].content[i][j].promoted_content = true;
                }
            }
        }

        function noBackground(name,index){
            var content = $scope.locationsList[index].content;
            for(var i=0 ;i<content.length; i++){
                //console.log(content[i])
                for(var j=0; j< content[i].length;j++){
                    if (content[i][j].name == name)
                        $scope.locationsList[index].content[i][j].promoted_content = null;
                }
            }
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



    }


})();