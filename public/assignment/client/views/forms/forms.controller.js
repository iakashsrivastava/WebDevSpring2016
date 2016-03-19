/**
 * Created by akash on 2/23/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,$scope,$rootScope,$location){

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.getFormFields = getFormFields;

        $scope.allforms=[];
        var selectedIndex = -1;
        FormService.findAllFormsForUser($rootScope.loggedUser._id).then(
            function(response) {
                $scope.allforms = response;
            }
        )

        function addForm(index){
            FormService.createFormForUser($rootScope.loggedUser._id, $scope.title).then(
                function(response){
                    $scope.allforms = response;
                    $scope.title = null;
                });
        }

        function selectForm(index){
            var form = $scope.allforms[index];
            $scope.title = form.title;
            selectedIndex = index;

        }

        function updateForm(title){
            var form = $scope.allforms[selectedIndex];
            console.log(form._id,title);
            FormService.updateFormById( form._id,title).then(
                function(response){
                    $scope.allforms = response;
                    $scope.title = null;
                });
        }

        function deleteForm(index){
            var form = $scope.allforms[index];
            FormService.deleteFormById(form._id).then(
                function(response){
                    $scope.allforms = response;
                });
        }

        function getFormFields(index,title){
            var form = $scope.allforms[index];
            $location.url("/fields/"+form._id+"/title/"+title);
        }

    }

})();