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
        findUserByTwitterId:findUserByTwitterId,
        userLikesArticle:userLikesArticle,
        findUsersByIds:findUsersByIds,
        userCommentsOnArticle:userCommentsOnArticle

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
        console.log(user);
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
    function updateUser1(userId, user) {

        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                return doc;
            }
        }).then(function(doc) {
            doc.username = user.username;
            doc.password = user.password;
            doc.firstName = user.firstName;
            doc.lastName = user.lastName;
            doc.emails = user.emails;
            doc.roles = user.roles;
            doc.likes = user.likes;
            doc.comments = user.comments;
            doc.search = user.search;
            doc.likesMovies = user.likesMovies;
            doc.categories = user.categories;
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

    function findUserByTwitterId(twitterId) {
        return UserModel.findOne({'twitter.id': twitterId});
    }

    function getMongooseModel() {
        return UserModel;
    }

    function userLikesArticle (userId, article) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.likes.push (article.articleId);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
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

    function userCommentsOnArticle (userId, article) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.comments.push (article.articleId);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

}