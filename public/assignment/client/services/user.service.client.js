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
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            logout :logout
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
            var endpoint = "/api/assignment/user/"+userId;
            console.log(user);
            var req = {
                method: 'PUT',
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

        function findUserByUsername(username){
            var deferred = $q.defer();

            $http.get("/api/assignment/user?username="+username)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserByCredentials(username,password){
            //var deferred = $q.defer();
            //var string = "/api/assignment/user?username="+ username + "&password=" +password;
            //
            //$http.get(string)
            //    .success(function(response){
            //        deferred.resolve(response);
            //    });
            //
            //return deferred.promise;
            var user = {
                username: username,
                password: password
            };

            return $http.post("/api/assignment/login", user);
        }

        function findAllUsers(){
            var deferred = $q.defer();

            $http.get("/api/assignment/user")
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteUserById(id){
            var deferred = $q.defer();

            $http.delete("/api/assignment/user/"+id)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

    }
})();