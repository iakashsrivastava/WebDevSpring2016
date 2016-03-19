/**
 * Created by akash on 3/18/16.
 */

/**
 * Created by akash on 3/17/16.
 */

var formData = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function() {

    var api = {
        getFormFields : getFormFields,
        getForm : getForm,
        createField:createField,
        updateField: updateField,
        deleteField:deleteField,
        cloneField:cloneField

    };

    return api;

    function getFormFields(formId){
        var fields=null;
        for (var index = 0; index < formData.length; index++) {
            if (formData[index]._id === formId) {
                fields = formData[index].fields;
                break;
            }
        }
        return fields;
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

    function createField(formId,field){

        field._id = uuid.v1();

        for (var index = 0; index < formData.length; index++) {
            if (formData[index]._id === formId) {
                formData[index].fields.push(field);
                break;
            }
        }
        var formFields = getFormFields(formId);
        return formFields;
    }

    function updateField(formId,fieldId,field) {

        for (var index = 0; index < formData.length; index++) {
            if (formData[index]._id === formId) {
                var fields = formData[index].fields;

                for (var ind = 0; ind < fields.length; ind++) {
                    if (fields[ind]._id === fieldId && fields[ind].type === field.type) {
                        fields[ind].label = field.label;
                        fields[ind].placeholder = field.value;
                        break;
                    }
                    if (fields[ind]._id === fieldId && fields[ind].type === field.type) {
                        fields[ind].label = field.label;
                        fields[ind].placeholder = field.value;
                        break;
                    }
                }

            }

            var formFields = getFormFields(formId);
            return formFields;
        }
    }

    function deleteField(formId, fieldId){
        var pos =-1;
        var uid =-1;
        for	(var index = 0; index < formData.length; index++) {
            if( formData[index]._id === formId){
                var fields = formData[index].fields;

                for(var ind =0; ind < fields.length; ind++){
                    if(fields[ind]._id === fieldId){
                        pos = ind;
                        break;
                    }
                }

                if(pos !== -1) {
                    formData[index].fields.splice(pos, 1);
                    break;
                }
            }
        }

        var formFields = getFormFields(formId);
        return formFields;

    }

    function cloneField(formId, fieldId){
        var pos =-1;
        var field =null;
        for	(var index = 0; index < formData.length; index++) {
            if( formData[index]._id === formId){
                var fields = formData[index].fields;

                for(var ind =0; ind < fields.length; ind++){
                    if(fields[ind]._id === fieldId){
                        pos = ind;
                        field = fields[ind];
                    }
                }

                if(pos !== -1) {
                    field._id = uuid.v1();
                    formData[index].fields.push(field);
                    break;
                }
            }
        }

        var formFields = getFormFields(formId);
        return formFields;

    }

}