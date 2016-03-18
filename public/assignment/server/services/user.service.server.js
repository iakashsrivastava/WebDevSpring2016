/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {
    console.log("uukn");
    var userModel = require("./../models/user.model.js")();

    app.get("/api/assignment/user",getUsers);
    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user/:id",getUser);
    app.put("/api/assignment/user/:id",updateUser);
    app.delete("/api/assignment/user/:id",deleteUser);

    function getUsers(req, res){

        if(query.req.username && query.req.password){
            var username = query.req.username;
            var password = query.req.password;
            res.send(userModel.getUserDetails(username,password));
        }
        else if(query.req.username){
            var username = query.req.username;
            res.send(userModel.getUserDetailsByUsername(username));
        }
        else{
            var allUsers = userModel.getUsers();
            res.send(allUsers);
        }

    }

    function createUser(req, res){
        var user = req.body.user;
        res.send(userModel.createUser(user));
    }

    function getUser(req, res){
        var userId = req.param.id;
        res.send(userModel.getUser(userId));
    }


    function updateUser(req, res){
        var userId = req.param.id;
        var user = req.body.user;
        res.send(userModel.updateUser(userId,user));
    }


    function deleteUser(req, res){
        var userId = req.param.id;
        res.send(userModel.deleteuser(userId));

    }

};