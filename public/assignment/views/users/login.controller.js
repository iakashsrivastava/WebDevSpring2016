/**
 * Created by akash on 2/23/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService,$scope,$rootScope,$location){

        $scope.login = login;

        function login(existingUser){
            UserService.findUserByCredentials(existingUser.username,existingUser.password,callback);

            function callback(response){
                if(response !== null){
                $rootScope.loggedUser = response;
                $location.url("/profile");
                }
            }
        }
    }


})();