/**
 * Created by akash on 2/25/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory(UserService)

    var current_users = [
        {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
            "username":"alice",  "password":"alice",   "roles": ["student"]                },
        {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
            "username":"bob",    "password":"bob",     "roles": ["admin"]                },
        {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
            "username":"charlie","password":"charlie", "roles": ["faculty"]                },
        {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
            "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
        {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
            "username":"ed",     "password":"ed",      "roles": ["student"]                }
    ];

    function UserService(){

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        return api;

        function findUserByCredentials(username, password, callback){
            var foundUser = null;
            for	(index = 0; index < current_users.length; index++) {
                if( current_users[index].username === username && current_users[index].password === password){
                    foundUser = current_users[index];
                    break;
                }
            }

            callback(foundUser);

        }

        function findAllUsers(callback){
            callback(current_users);

        }

        function createUser(user, callback){
            var id= (new Date).getTime();
            var obj = { _id:id ,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        username: user.username,
                        password: user.password,
                        roles: user.roles
                        };

            current_users.push(obj);

            callback(obj);
        }

        function deleteUserById(userId, callback){
            var pos =-1;
            for	(index = 0; index < current_users.length; index++) {
                if( current_users[index]._id === userId){
                    pos=index;
                    break;
                }

            }
            if(pos !== -1)
                current_users.splice(index,1);
            callback(current_users);

        }

        function updateUser(userId, user, callback){

        }



    }
})();