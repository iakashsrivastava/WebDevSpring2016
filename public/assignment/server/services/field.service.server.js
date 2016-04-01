/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app, userModel,formModel,fieldModel) {

    app.get("/api/assignment/form/:formId/field",getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFormField);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    app.put("/api/assignment/form/:formId/field/:fieldId/clone",cloneField);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);

    function getFormFields(req, res){
        var formId = req.params.formId;
        res.send(userModel.getFormFields(formId));
    }

    function getFormField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.send(userModel.getFormField(formId,fieldId));
    }

    function createField(req, res){
        var formId = req.params.formId;
        var field = req.body.field;
        res.send(userModel.createField(formId,field));
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body.field;
        res.send(userModel.updateField(formId,fieldId,field));
    }

    function cloneField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.send(userModel.cloneField(formId,fieldId));
    }


    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.send(userModel.deleteField(formId,fieldId));

    }

};