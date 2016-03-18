/**
 * Created by akash on 2/23/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);


    function configuration($routeProvider){
        $routeProvider

            .when("/home",{
                templateUrl: "./views/home/home.view.html"
            })

            .when("/forms",{
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormController"
            })

            .when("/fields",{
                templateUrl: "./views/forms/form-fields.view.html",
                controller: "FieldController"

            })

            .when("/profile",{
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController"
            })

            .when("/admin",{
                templateUrl: "./views/admin/admin.view.html"
            })

            .when("/register",{
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController"
            })

            .when("/login",{
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController"

            })

            .otherwise({
                redirectTo: "/home"
            });

    }

})();
