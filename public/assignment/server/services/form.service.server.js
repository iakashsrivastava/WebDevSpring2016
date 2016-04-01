/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app, userModel,formModel,fieldModel) {

    app.get("/api/assignment/user/:userId/form",getUserForms);
    app.get("/api/assignment/form/:formId",getForm);
    app.post("/api/assignment/user/:userId/form",createForm);
    app.put("/api/assignment/form/:formId",updateForm);
    app.delete("/api/assignment/form/:formId",deleteForm);

    function getUserForms(req, res){
        var userId = req.params.userId;
        res.send(userModel.getUserForms(userId));
    }

    function getForm(req, res){
        var formId = req.params.formId;
        res.send(userModel.getForm(formId));
    }

    function createForm(req, res){
        var userId = req.params.userId;
        var form = req.body.form;
        res.send(userModel.createForm(userId,form));
    }


    function updateForm(req, res){
        var formId = req.params.formId;
        var title = req.body.title;
        res.send(userModel.updateForm(formId,title));
    }


    function deleteForm(req, res){
        var formId = req.params.formId;
        res.send(userModel.deleteForm(formId));

    }

};