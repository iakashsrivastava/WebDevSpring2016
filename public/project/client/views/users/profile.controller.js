/**
 * Created by akash on 2/23/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$scope,$rootScope){

        $scope.profile = $rootScope.loggedUser;
        $scope.update = update;
        $scope.updateCategory = updateCategory;

        function update(loggedUser) {

            UserService.updateUser(loggedUser._id,loggedUser).then(
                function(response){
                    console.log(response);
                    //$rootScope.loggedUser = response;
                      //  $scope.loggedUser = loggedUser;

                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

        $scope.categories = [
            { name: 'News',    selected: true },
            { name: 'Science',   selected: true },
            { name: 'Entertainment',     selected: true },
            { name: 'Sports', selected: false }
        ];

        // selected fruits
        $scope.selection = [];

        // helper method to get selected fruits
        $scope.selectedCategories = function selectedCategories() {
            return filterFilter($scope.categories, { selected: true });
        };

        // watch fruits for changes
        $scope.$watch('categories|filter:{selected:true}', function (nv) {
            $scope.selection = nv.map(function (category) {
                return category.name;
            });
        }, true);

        function updateCategory() {
            //console.log($rootScope.loggedUser);
            $rootScope.loggedUser.categories = $scope.selection;
            UserService.updateUser($rootScope.loggedUser._id,$rootScope.loggedUser).then(
                function(response){
                    //$rootScope.loggedUser = response;
                    //$scope.loggedUser = response;
                },
                function(err) {
                    $scope.error = err;
                }
            );
        }





    }


})();