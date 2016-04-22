/**
 * Created by akash on 2/23/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService,$scope,$rootScope,$location,$routeParams){

        var formId = $routeParams.formId;
        $scope.formTitle = $routeParams.title;
        $scope.addField = addField;
        $scope.deleteField =deleteField;
        $scope.cloneField = cloneField;
        $scope.openModal =openModal;
        $scope.fromModal =fromModal;
        $scope.cancelModal =cancelModal;
        $scope.sort = sort;
        $scope.sortOption ={
          handle : '.mover'
        };

        $scope.items = ['Single Line Text', 'Multi Line Text Field', 'Date Field',
                        'Dropdown Field', 'Checkboxes Field', 'Radio Buttons Field'];
        $scope.selection = null;
        $scope.allFields=[];

        function getfields(formId) {
            FieldService.getFieldsForForm(formId).then(
                function (response) {
                    $scope.allFields = response;
                }
            );
        }

        function sort(start, end) {
            FieldService.sort(formId, start, end).then(
                function (response) {

                },
                function(err) {
                    $scope.error = err;
                }
            )
        }

        getfields(formId);
        function deleteField(fieldId){
            FieldService.deleteField(formId,fieldId).then(
                function(response){
                    $scope.allFields = response;
                });
        }

        function addField(item){
            var field = null;
            if(item === 'Single Line Text'){
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if(item === 'Multi Line Text Field') {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if(item === 'Date Field') {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            else if(item === 'Dropdown Field') {
                field =
                {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]
                };
            }
            else if(item === 'Checkboxes Field') {
                field =
                {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]
                };
            }
            else if(item === 'Radio Buttons Field') {
                field =
                {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]
                };
            }

            FieldService.createField(formId,field).then(
                function(response) {
                    $scope.allFields = response;
                    $scope.selection = null;
                }
            )

        }

        function cloneField(fieldId){
            FieldService.cloneField(formId,fieldId).then(
                function(response){
                    getfields(formId);
                });
        }

        function cancelModal(field){
            $scope.value =null;
        }

        function openModal(field){
            $scope.value =field;
        }

        function fromModal(fieldId, field,type){
            $scope.value =null;
            FieldService.updateField(formId,fieldId,field,type).then(
                function(response){
                    $scope.allFields = response;

                });
            getfields(formId);
        }

    }

})();