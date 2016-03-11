/**
 * Created by akash on 3/2/16.
 */

"use strict";
(function(){
    angular
        .module("SocialMashup")
        .config(configuration);


    function configuration($routeProvider){
        $routeProvider

            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                controller:"HomeController"
            })
            .when("/details/:Id",{
                templateUrl: "./views/detail/detail.view.html",
                controller:"DetailsController"
            })

            .otherwise({
                redirectTo: "/home"
            });

    }

})();
