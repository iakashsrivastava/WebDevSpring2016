/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app, userModel) {

    app.get("/api/assignment/user",getUsers);
    app.post("/api/assignment/user",createUser);
    app.get("/api/assignment/user/:id",getUser);
    app.put("/api/assignment/user/:id",updateUser);
    app.delete("/api/assignment/user/:id",deleteUser);

    function getUsers(req, res){

        if(req.query.username && req.query.password){
            var username = req.query.username;
            var password = req.query.password;
            userModel.getUserDetails(username,password)
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
        else if(query.req.username){
            var username = req.query.username;
            userModel.getUserDetailsByUsername(username)
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
        else{
            userModel.getUsers()
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

    }

    function createUser(req, res){
        var user = req.body.user;
        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    console.log(doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUser(req, res){
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
                    console.log(doc);
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

};