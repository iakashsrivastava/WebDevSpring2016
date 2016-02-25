/**
 * Created by akash on 2/25/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, $scope){

        $scope.$location =$location;


    }

})();