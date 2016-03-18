/**
 * Created by akash on 3/17/16.
 */

var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        getUsers:getUsers,
        updateUser:updateUser,
        getUserDetails:getUserDetails,
        deleteUser:deleteUser,
        getUserDetailsByUsername:getUserDetailsByUsername
    };

    return api;

    function createUser(user){
        var id= (new Date).getTime();

        var obj = {
            _id:id ,
            username: user.username,
            password: user.password,
            email: user.email
        };

        mock.push(obj);

        return obj;

    }

    function getUsers(){
        return mock;
    }

    function updateUser(userId, user){

        for(var i =0; i<mock.length; i++){
            if(mock[i]._id === userId){
                mock[i] = user;
                break;
            }
        }

        return user;
    }

    function getUserDetails(username, password){
        var user = null;

        for(var i =0; i<mock.length; i++){
            if(mock[i].username === username && mock[i].password === password){
                user =mock[i];
                break;
            }
        }

        return user;

    }

    function getUserDetailsByUsername(username){
        var user = null;

        for(var i =0; i<mock.length; i++){
            if(mock[i].username === username){
                user =mock[i];
                break;
            }
        }

        return user;

    }

    function deleteUser(userId){

        for	(var index = 0; index < mock.length; index++) {
            if( mock[index]._id === userId){
                pos=index;
                break;
            }

        }
        if(pos !== -1)
            mock.splice(pos,1);
        res.send(mock);
    }
}