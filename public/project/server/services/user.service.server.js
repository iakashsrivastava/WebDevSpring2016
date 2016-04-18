/**
 * Created by akash on 3/17/16.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose         = require("mongoose");

module.exports = function(app, userModel) {

    app.get("/api/project/user",findAllUsers);
    app.post("/api/project/user",createUser);
    app.get("/api/project/user/:id",findUserById);
    app.put("/api/project/user/:id",updateUser);
    app.delete("/api/project/user/:id",deleteUser);

    app.post("/api/project/login", passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.get('/api/project/loggedin', loggedin);

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID_AUTH,
        clientSecret    : process.env.FACEBOOK__CLIENT_SECRET_AUTH,
        callbackURL     : process.env.FACEBOOK_CALLBACK_URL_AUTH
    };

    var twitterConfig = {
        consumerKey        : process.env.TWITTER_CLIENT_ID_AUTH,
        consumerSecret    : process.env.TWITTER_CLIENT_SECRET_AUTH,
        callbackURL     : 'http://webdev2016-srivastavaakash.rhcloud.com/project/auth/twitter/callback'
    };

    // passport functionalities - start
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new TwitterStrategy(twitterConfig, twitterStrategy));

    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get   ('/project/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/client/index.html#/profile',
            failureRedirect: '/#/login'
        }));

    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/project/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/client/index.html#/profile',
            failureRedirect: '/#/login'
        }));

    app.get   ('/auth/twitter', passport.authenticate('twitter', { scope : ['profile', 'email'] }));

    app.get('/project/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: 'project/client/index.html#/profile',
            failureRedirect: '/#/login'
        }));

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

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function twitterStrategy(token, refreshToken, profile, done) {
        console.log("Inside Strategey")
        userModel
            .findUserByTwitterId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        console.log(profile)
                        var newTwitterUser = {
                            lastName: profile.name,
                            firstName: profile.displayName,
                            email: '',
                            twitter: {
                                id:          profile.id,
                                token:       token
                            }
                        };
                        return userModel.createUser(newTwitterUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        //console.log("Deserialized User: "+ JSON.stringify(user));
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