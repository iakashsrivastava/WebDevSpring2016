/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app, userModel,formModel,fieldModel) {

    app.get("/api/assignment/user",getUsers);
    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user/:id",getUser);
    app.put("/api/assignment/user/:id",updateUser);
    app.delete("/api/assignment/user/:id",deleteUser);

    function getUsers(req, res){

        if(req.query.username && req.query.password){
            var username = req.query.username;
            var password = req.query.password;
            res.send(userModel.getUserDetails(username,password));
        }
        else if(query.req.username){
            var username = req.query.username;
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
        var userId = req.params.id;
        res.send(userModel.getUser(userId));
    }


    function updateUser(req, res){
        var userId = req.params.id;
        var user = req.body.user;
        res.send(userModel.updateUser(userId,user));
    }


    function deleteUser(req, res){
        var userId = req.params.id;
        res.send(userModel.deleteuser(userId));

    }

};