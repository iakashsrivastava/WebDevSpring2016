/**
 * Created by akash on 2/25/16.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($http,$q){

        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }

        return api;

        function createFormForUser(userId, title){

            var deferred = $q.defer();
            var endpoint = "/api/assignment/user/" + userId + "/form";

            var obj = {
                title:title,
                userId:userId
            };

            var req = {
                method: 'POST',
                url: endpoint,
                data: {
                    form: obj
                }
            };

            $http(req)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/"+userId+ "/form")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function deleteFormById(formId){
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/"+formId)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;

        }

        function updateFormById(formId, title){

            var deferred = $q.defer();
            var endpoint = "/api/assignment/form/" + formId;

            var req = {
                method: 'PUT',
                url: endpoint,
                data: {
                    title: title
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