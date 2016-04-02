/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app,formModel) {

    app.get("/api/assignment/user/:userId/form",getUserForms);
    app.get("/api/assignment/form/:formId",getForm);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId",updateForm);
    app.delete("/api/assignment/form/:formId",deleteForm);

    function getUserForms(req, res){
        var userId = req.params.userId;
        formModel.getUserForms(userId)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {

                    res.send(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getForm(req, res){
        var formId = req.params.formId;
        formModel.getForm(formId)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {

                    res.send(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function createForm(req, res){
        var userId = req.params.userId;
        var form = req.body.form;
        formModel.createForm(userId,form)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {

                    res.send(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req, res){
        var formId = req.params.formId;
        var title = req.body.title;
        formModel.updateForm(formId,title)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {

                    res.send(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }


    function deleteForm(req, res){
        var formId = req.params.formId;
        formModel.deleteForm(formId)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {

                    res.send(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

};