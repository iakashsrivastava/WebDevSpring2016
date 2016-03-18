/**
 * Created by akash on 3/17/16.
 */

/**
 * Created by akash on 3/17/16.
 */



module.exports = function(app) {
    var formModel = require("./../models/user.model.js")();

    app.get("/api/assignment/form/:formId/field",getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId",getForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",removeForm);
    app.post("/api/assignment/form/:formId/field", createForm);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateForm);

    function getFormFields(req, res){

        var fields = [];
        var formId = req.param.formId;

        for (var index = 0; index < formModel.length; index++) {
            if (formData[index]._id === formId) {
                fields = formModel[index].fields;
            }
        }

        res.send();
    }

    function getForm(req, res){

        var foundForm = null;
        var formId = req.param.formId;

        for (var index = 0; index < formModel.length; index++) {
            if (formData[index]._id === formId) {
                foundForm = formData[index];
                break;
            }
        }
        res.send(foundForm);
    }


    function removeForm(req, res){

        var formId = req.param.formId;
        var pos = -1;

        for	(var index = 0; index < userModel.length; index++) {
            if( userModel[index]._id === formId){
                pos=index;
                break;
            }

        }
        if(pos !== -1)
            userModel.splice(pos,1);

        res.send(userModel);
    }



    function createForm(req, res){

        res.send();
    }

    function updateForm(req, res){

        res.send();
    }
};