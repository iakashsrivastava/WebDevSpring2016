/**
 * Created by akash on 2/25/16.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService",FieldService);

    function FieldService($http,$q){

        var api = {
            getFieldsForForm:getFieldsForForm,
            createField:createField,
            deleteField:deleteField,
            cloneField:cloneField,
            updateField:updateField
        }

        return api;

        function getFieldsForForm(formId){
            var deferred = $q.defer();

            $http.get("/api/assignment/form/" + formId + "/field")
                .success(function(response){
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createField(formId, field){
            var deferred = $q.defer();
            var endpoint = "/api/assignment/form/" +formId +"/field"

            var req = {
                method: 'POST',
                url: endpoint,
                data: {
                    field: field
                }
            };

            $http(req)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function deleteField(formId,fieldId){
            var deferred = $q.defer();
            var url = "/api/assignment/form/" +formId +"/field/" +fieldId;

            $http.delete(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function cloneField(formId,fieldId){
            var deferred = $q.defer();

            var url = "/api/assignment/form/" +formId +"/field/" +fieldId+"/clone";

            $http.put(url)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function updateField(formId,fieldId,field,type){
            var deferred = $q.defer();
            var field={
                fieldId:fieldId,
                label:field.label,
                type:type,
                value:field.value,
                options:field.options
            }

            var endpoint = "/api/assignment/form/" + formId +"/field/" +fieldId;

            var req = {
                method: 'PUT',
                url: endpoint,
                data: {
                    field: field
                }
            };

            $http(req)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }


    }
})();