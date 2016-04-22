/**
 * Created by akash on 3/17/16.
 */

    //app.get("/api/assignment/user",getUsers);
    //app.post("/api/assignment/user",createUser);
    //app.get("/api/assignment/user/:id",getUser);
    //app.put("/api/assignment/user/:id",updateUser);
    //app.delete("/api/assignment/user/:id",deleteUser);

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongoose         = require("mongoose");

module.exports = function(app, userModel) {

    app.get("/api/assignment/user",findAllUsers);
    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user/:id",findUserById);
    app.put("/api/assignment/user/:id",updateUser);
    app.delete("/api/assignment/user/:id",deleteUser);

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedin);


    // passport functionalities - start
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        var newUser = req.body.user;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {

        if(req.query.username)
            findUserByUsername(req, res);
        else {
            userModel.findAllUsers().then(
                function (docs) {
                    res.json(docs);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
        }
    }

    function findUserById(req, res){
        var userId = req.params.id;
        userModel.getUser(userId)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {

                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var userId = req.params.id;
        var user = req.body.user;
        userModel.updateUser(userId,user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
        var userId = req.params.id;
        userModel.deleteUser(userId)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {

                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username).then(
            function (doc) {
                res.json(doc);
            },
            // send error if promise rejected
            function (err) {
                res.status(400).send(err);
            }
        )
    }

    //==================

    //function findAllUsers(req, res){
    //
    //    if(req.query.username && req.query.password){
    //        var username = req.query.username;
    //        var password = req.query.password;
    //        userModel.getUserDetails(username,password)
    //            // handle model promise
    //            .then(
    //                // login user if promise resolved
    //                function ( doc ) {
    //                    res.json(doc);
    //                },
    //                // send error if promise rejected
    //                function ( err ) {
    //                    res.status(400).send(err);
    //                }
    //            );
    //    }
    //    else if(query.req.username){
    //        var username = req.query.username;
    //        userModel.getUserDetailsByUsername(username)
    //            // handle model promise
    //            .then(
    //                // login user if promise resolved
    //                function ( doc ) {
    //                    res.json(doc);
    //                },
    //                // send error if promise rejected
    //                function ( err ) {
    //                    res.status(400).send(err);
    //                }
    //            );
    //    }
    //    else{
    //        userModel.getUsers()
    //            // handle model promise
    //            .then(
    //                // login user if promise resolved
    //                function ( doc ) {
    //                    res.json(doc);
    //                },
    //                // send error if promise rejected
    //                function ( err ) {
    //                    res.status(400).send(err);
    //                }
    //            );
    //    }
    //
    //}
    //
    //function createUser(req, res){
    //    var user = req.body.user;
    //    user = userModel.createUser(user)
    //        // handle model promise
    //        .then(
    //            // login user if promise resolved
    //            function ( doc ) {
    //                console.log(doc);
    //                res.json(doc);
    //            },
    //            // send error if promise rejected
    //            function ( err ) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}


};