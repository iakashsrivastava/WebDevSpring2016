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
    var UserModel = mongoose.model('user', userSchema);

    var api = {
        createUser: createUser,
        getUsers:getUsers,
        updateUser:updateUser,
        getUserDetails:getUserDetails,
        deleteUser:deleteUser,
        getUserDetailsByUsername:getUserDetailsByUsername
    };

    return api;

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

    function getUsers(){
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

    function getUserDetails(username, password){
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

    function getUserDetailsByUsername(username){
        var deferred = q.defer();
        // find without first argument retrieves all documents
        UserModel.findOne({ username: username }, function(err, docs) {
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

    function updateUser(userId, user) {

        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                return doc;
            }
        }).then(function(doc) {
            doc.username = updatedUser.username;
            doc.password = updatedUser.password;
            doc.firstName = updatedUser.firstName;
            doc.lastName = updatedUser.lastName;
            doc.emails = updatedUser.emails;
            doc.phones = updatedUser.phones;
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
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err, resp) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(resp);
            }
        });

        return deferred.promise;
    }
}