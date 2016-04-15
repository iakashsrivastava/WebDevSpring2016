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
        $scope.addNewCategory =addNewCategory;
        $scope.removeCategory =removeCategory;
        $scope.print = print;
        $scope.undoCategory = undoCategory;

        $scope.showProfile =

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

        function loadUserCategories(){
            var categoryList = $rootScope.loggedUser.categories;

            if(categoryList.length>0){
                var userCategories =[];
                for( var j=0; j<categoryList.length ;j++){
                    var obj = {
                        name: categoryList[j],
                        selected: true,
                        position: j+1,
                        color:{}
                    }
                    console.log(obj);
                    userCategories.push(obj);
                }
                $scope.categories = userCategories;
            }
            else{
                $scope.categories = [
                    { name: 'News',    selected: true, position: 1, color:{} },
                    { name: 'Science',   selected: true, position: 2, color:{} },
                    { name: 'Entertainment',     selected: true,position: 3, color:{} },
                    { name: 'Sports', selected: true, position: 4, color:{} }
                ];
            }
        }
        loadUserCategories();

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
            console.log($scope.selection);
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


        function addNewCategory(newUserCategory){
            $scope.hasError='has-error';
            if(newUserCategory){
                var newCategory ={
                    name: newUserCategory,
                    selected: true,
                    position: $scope.categories.length +1,
                    color:{}
                }
                $scope.categories.push(newCategory);
                $scope.newCategory='';
            }
        }

        function removeCategory(category){
            for(var j=0; j<$scope.categories.length; j++){
                if(category === $scope.categories[j].name) {
                    $scope.categories[j].selected = false;
                    $scope.categories[j].color = {"color": "red"};
                }
            }
        }

        function undoCategory(category){
            for(var j=0; j<$scope.categories.length; j++){
                if(category === $scope.categories[j].name) {
                    $scope.categories[j].selected = true;
                    $scope.categories[j].color = {};
                }
            }
        }

        function print(){
            console.log(JSON.stringify($scope.categories));
            console.log(JSON.stringify($scope.selection));
        }



    }


})();