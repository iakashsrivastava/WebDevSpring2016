/**
 * Created by akash on 3/24/16.
 */
/**
 * Created by akash on 3/10/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .controller("CategoryController",CategoryController);

    function CategoryController($scope,$routeParams) {

        $scope.category = $routeParams.category;

    }

})();