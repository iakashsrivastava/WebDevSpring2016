/**
 * Created by akash on 3/17/16.
 */

var formData = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function() {

    var api = {
        getUserForms : getUserForms,
        getForm : getForm,
        createForm:createForm,
        updateForm: updateForm,
        deleteForm:deleteForm

    };

    return api;

    function getUserForms(userId){

        var array = [];
        userId = parseInt(userId);
        for (var index = 0; index < formData.length; index++) {
            if (formData[index].userId === userId) {
                array.push(formData[index]);
            }
        }
        return array;
    }

    function getForm(formId){

        var form = null;
        formId = parseInt(formId);

        for (var index = 0; index < formData.length; index++) {
            if (formData[index]._id === formId) {
                form = formData[index];
                break;
            }
        }
        return form;
    }

    function createForm(userId,form){

        var form = {
            _id: uuid.v1(),
            title: form.title,
            userId: parseInt(userId)
        }
        formData.push(form);

        var userForms = getUserForms(userId);
        return userForms;
    }

    function updateForm(formId,title){
        formId = parseInt(formId);
        var userId =-1;
        console.log(title);
        console.log(formId);
        for (var index = 0; index < formData.length; index++) {
            if (formData[index]._id === formId) {
                formData[index].title = title;
                userId = formData[index].userId;
                console.log("Inside");
                break;
            }
        }
        var userForms = getUserForms(userId);
        console.log(formData);
        return userForms;
    }

    function deleteForm(formId){
        var pos =-1;
        var uid =-1;
        for	(var index = 0; index < formData.length; index++) {
            if( formData[index]._id === formId){
                pos=index;
                uid=formData[index].userId;
                break;
            }
        }
        if(pos !== -1)
            formData.splice(pos,1);

        return getUserForms(uid);

    }

}