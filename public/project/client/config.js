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
            .when("/details/:Id/:Source",{
                templateUrl: "./views/detail/detail.view.html",
                controller:"DetailsController"
            })
            .when("/search/:query",{
                templateUrl: "./views/Search/search.view.html",
                controller:"SearchController"
            })
            .when("/category/:category",{
                templateUrl: "./views/category/category.view.html",
                controller:"CategoryController"
            })

            .otherwise({
                redirectTo: "/home"
            });

    }

})();
