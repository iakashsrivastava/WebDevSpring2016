/**
 * Created by akash on 3/17/16.
 */

//var mock = require("./user.mock.json");
// load q promise library
var q = require("q");


module.exports = function(db,mongoose) {
    // load user schema
    var userSchema = require("./user.schema.server.js")(mongoose);

    //create model for schema
    var UserModel = mongoose.model('MashupUsers', userSchema);

    var api = {
        createUser: createUser,
        findAllUsers:findAllUsers,
        updateUser:updateUser,
        findUserByCredentials:findUserByCredentials,
        deleteUser:deleteUser,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        findUserByFacebookId:findUserByFacebookId,
        findUserByGoogleId:findUserByGoogleId,
        getMongooseModel: getMongooseModel,
        findUserByTwitterId:findUserByTwitterId

    };

    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function createUser(user) {

        // use q to defer the response
        var deferred = q.defer();

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
        UserModel.findOne({ username: username ,password: password }, function(err, docs) {
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
        return UserModel.update({_id: userId}, {$set: user});
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

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function findUserByTwitterId(twitterId) {
        return UserModel.findOne({'twitter.id': twitterId});
    }

    function getMongooseModel() {
        return UserModel;
    }

}