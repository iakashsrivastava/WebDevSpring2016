var q = require("q");
var bcrypt = require('bcrypt-nodejs');


module.exports = function(db,mongoose) {
    // load user schema
    var userSchema = require("./user.schema.server.js")(mongoose);

    //create model for schema
    var UserModel = mongoose.model('user', userSchema);

    var api = {
        createUser: createUser,
        findAllUsers:findAllUsers,
        updateUser:updateUser,
        findUserByCredentials:findUserByCredentials,
        deleteUser:deleteUser,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        getMongooseModel: getMongooseModel,
        findUsersByIds:findUsersByIds
    };

    return api;

    function createUser(user) {

        // use q to defer the response
        var deferred = q.defer();
        var decrytedPassword = user.password;
        var encrytedPassword = bcrypt.hashSync(decrytedPassword);
        user.password = encrytedPassword;

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        // find without first argument retrieves all documents
        UserModel.find({}, function(err, docs) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password){

        var deferred = q.defer();
        // find without first argument retrieves all documents
        UserModel.findOne({ username: username }, function(err, doc) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                if(doc && doc.password) {
                    if(bcrypt.compareSync(password, doc.password)) {
                        deferred.resolve(doc);
                    } else{
                        deferred.resolve('');
                    }
                } else {
                    deferred.resolve('');
                }

            }

        });

        return deferred.promise;

    }

    function findUserByUsername(username){
        if(username) {
            var deferred = q.defer();
            // find without first argument retrieves all documents
            UserModel.findOne({username: username}, function (err, docs) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }
            });
            return deferred.promise;
        }
    }

    function updateUser(userId, user) {

        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                return doc;
            }
        }).then(function(doc) {
            if(doc.password != user.password)
                doc.password = bcrypt.hashSync(user.password);
            doc.username = user.username;
            doc.firstName = user.firstName;
            doc.lastName = user.lastName;
            doc.emails = user.emails;
            doc.roles = user.roles;
            doc.phones = user.phones;
            doc.save(function(err, resp) {
                if(err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    deferred.resolve(resp);
                }
            });
        });

        return deferred.promise;
    }

    function deleteUser(userId){
        return UserModel.remove({_id: userId});
    }

    function findUserById(userId) {
        if(userId) {
            var deferred = q.defer();
            UserModel.findById(userId, function (err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });
            return deferred.promise;
        }
    }


    function getMongooseModel() {
        return UserModel;
    }

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

}