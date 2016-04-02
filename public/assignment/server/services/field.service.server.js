/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app, fieldModel) {

    app.get("/api/assignment/form/:formId/field",getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFormField);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    app.put("/api/assignment/form/:formId/field/:fieldId/clone",cloneField);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);

    function getFormFields(req, res){
        var formId = req.params.formId;

        fieldModel.getFormFields(formId)
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

    function getFormField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.getFormField(formId,fieldId)
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

    function createField(req, res){
        var formId = req.params.formId;
        var field = req.body.field;
        fieldModel.createField(formId,field)
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

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body.field;

        fieldModel.updateField(formId,fieldId,field)
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

    function cloneField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.send(fieldModel.cloneField(formId,fieldId));
    }


    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteField(formId,fieldId)
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