/**
 * Created by akash on 4/16/16.
 */

(function(){
    angular
        .module("SocialMashup")
        .factory("AdminService", AdminService);

    function AdminService($http) {

    }
})();

//app.get("/api/project/user",findAllUsers);
//app.post("/api/project/user",createUser);
//app.get("/api/project/user/:id",findUserById);
//app.put("/api/project/user/:id",updateUser);
//app.delete("/api/project/user/:id",deleteUser);