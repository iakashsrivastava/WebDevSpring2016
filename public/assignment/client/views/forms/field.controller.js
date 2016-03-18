/**
 * Created by akash on 2/23/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FormService,$scope,$rootScope,$location){

        $scope.addField = addField;
        $scope.items = ['Single Line Text', 'Multi Line Text Field', 'Date Field',
                        'Dropdown Field', 'Checkboxes Field', 'Radio Buttons Field'];
        $scope.selection = null;

        function addField(type){

        }


    }

})();