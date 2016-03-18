/**
 * Created by akash on 3/17/16.
 */



module.exports = function(app) {
    var formModel = require("./../models/user.model.js")();



    function getUserForms(req, res){

        var array = [];
        var userId = req.param.userId;
        for (var index = 0; index < formModel.length; index++) {
            if (formData[index].userId === userId) {
                array.push(formModel[index]);
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