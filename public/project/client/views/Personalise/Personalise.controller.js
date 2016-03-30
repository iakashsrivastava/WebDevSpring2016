/**
 * Created by akash on 3/29/16.
 */
/**
 * Created by akash on 3/3/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("PersonaliseController",PersonaliseController);

    function PersonaliseController($scope) {
        $scope.categories=['Sports','News','Entertaintment'];

    }

})();