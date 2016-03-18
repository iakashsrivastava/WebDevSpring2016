/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {
    var userModel = require("./../models/form.model.js")();

    app.get("/api/assignment/form/:formId/field",getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId",getFormField);
    app.post("/api/assignment/form/:formId/field",createField);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteField);

    function getFormFields(req, res){
        var userId = req.params.formId;
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
        var title = req.body.title;
        res.send(userModel.updateField(formId,title));
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.send(userModel.deleteField(formId,fieldId));

    }

};