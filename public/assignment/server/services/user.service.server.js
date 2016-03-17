/**
 * Created by akash on 3/17/16.
 */



module.exports = function(app) {
    var userModel = require("./../model/user.model.js")();

    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user",getUsers);
    app.get(" /api/assignment/user/:id",getUser);
    app.get("/api/assignment/user?username=username", getUserByUserName);
    app.get("/api/assignment/user?username=username&password=password",createUser);
    app.put("/api/assignment/user/:id",updateUser);
    app.delete("/api/assignment/user/:id",deleteUser);

    function createUser(req, res){

        var id= (new Date).getTime();
        var obj = {
            _id:id ,
            firstName: user.firstname,
            lastName: user.lastname,
            username: user.username,
            password: user.password,
            roles: user.roles,
            email: user.email
        };

        userModel.push(obj);

        res.send(userModel);
    }

    function getUsers(req, res){
        res.send(userModel);
    }

    function getUser(req, res){
        var id = req.param.id;

        var foundUser = null;
        for	(var index = 0; index < userModel.length; index++) {
            if( userModel[index]._id === id){
                foundUser = userModel[index];
                break;
            }
        }

        res.send(userModel);
    }

    function getUserByUserName(req, res){
    }

    function createUser(req, res){
    }

    function updateUser(req, res){

        res.send(userModel);
    }

    function deleteUser(req, res){

        var id = req.param.id;
        var pos = -1;

        for	(var index = 0; index < userModel.length; index++) {
            if( userModel[index]._id === id){
                pos=index;
                break;
            }

        }
        if(pos !== -1)
            userModel.splice(index,1);

        res.send(userModel);
    }


    function updateUser(userId, user, callback){

        for	(var index = 0; index < current_users.length; index++) {
            if( current_users[index]._id === userId){
                current_users[index] = user;
            }
        }
        callback(user);

    }


};