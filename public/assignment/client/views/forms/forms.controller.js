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

        $scope.allforms=[];
        var selectedIndex = -1;
        FormService.findAllFormsForUser($rootScope.loggedUser._id, callback);

        function callback(response){
            $scope.allforms = response;

        }

        function addForm(index){

                FormService.createFormForUser($rootScope.loggedUser._id, $scope.title, callback);

                function callback(response) {
                    $scope.allforms.push(response);
                    $scope.title = null;

            }
        }

        function selectForm(index){
            var form = $scope.allforms[index];
            $scope.title = form.title;
            selectedIndex = index;
            function callback(response){

            }

        }

        function updateForm(title){

            var form = $scope.allforms[selectedIndex];
            
            form.title = title;
            FormService.updateFormById( form._id,form,callback);
            function callback(response){
                FormService.findAllFormsForUser($rootScope.loggedUser._id, callback);


                function callback(response){
                    $scope.allforms = response;
                    $scope.title = null;

                }
            }

        }

        function deleteForm(index){

            var form = $scope.allforms[index];
            FormService.deleteFormById(form._id,callback);

            function callback(response){
                $scope.allforms =response;
            }

        }

    }

})();