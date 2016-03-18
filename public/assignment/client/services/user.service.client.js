/**
 * Created by akash on 2/25/16.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($http,$q){
        var current_users=[];
        var api = {
            createUser: createUser,
            updateUser: updateUser

        };

        return api;

        function createUser(user){

            var deferred = $q.defer();

            var endpoint = "/api/assignment/user";
            var req = {
                method: 'POST',
                url: endpoint,
                data: {
                    user: user
                }
            };

            $http(req)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUser(userId, user){

            var deferred = $q.defer();

            var endpoint = "/api/assignment/user/:"+userId;
            var req = {
                method: 'PUT',
                url: endpoint,
                data: {
                    user: user
                }
            };
            console.log(user);
            $http(req)
                .success(function(response){
                    console.log(response);
                    deferred.resolve(response);
                });

            return deferred.promise;
        }







    }
})();