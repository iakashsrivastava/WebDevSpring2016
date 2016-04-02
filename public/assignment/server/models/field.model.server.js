/**
 * Created by akash on 3/18/16.
 */

/**
 * Created by akash on 3/17/16.
 */

//var formData = require("./form.mock.json");


var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db,mongoose,formModel) {

    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model('field', fieldSchema);

    var formModel = formModel.getMongooseModel();

    var api = {
        getFormFields : getFormFields,
        getForm : getForm,
        createField :createField,
        updateField : updateField,
        deleteField : deleteField,
        cloneField : cloneField
    };

    return api;

    function getFormFields(formId){
        var deferred = q.defer();
        formModel.findById(formId, function(err, docs) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                var fields = docs.fields;
                deferred.resolve(fields);
            }
        });
        return deferred.promise;
    }

    function getForm(formId){
        var deferred = q.defer();
        formModel.findById(formId, function(err, docs) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }

    function createField(formId,field){

        var formField = new fieldModel({
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        });
        //console.log(formField);
        var deferred = q.defer();

        var p = formModel.findById(formId);

        p.then(function(response) {

            return response;
        }).then(function(doc) {

            var fields = doc.fields;

            fields.push(formField);

            doc.fields = fields;
            return doc.save();

        }).then(function(doc){
            return getFormFields(formId);
        }).then(function(response) {
           deferred.resolve(response);
        });
        return deferred.promise;
    }

    function updateField(formId,fieldId,field) {
            var deferred = q.defer();

            var ObjectId = mongoose.Types.ObjectId;

            var newField = new fieldModel({
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                options: field.options
            });

            formModel.findOneAndUpdate(
                {_id: formId, 'fields._id': new ObjectId(fieldId)},
                {$set: {'fields.$': newField}},
                {new: true},
                function(err, doc) {
                    if (!err) {
                        deferred.resolve(doc);
                    }
                    else {
                        deferred.reject(err);
                    }
                }
            );
            return deferred.promise;
        }

    function deleteField(formId, fieldId){
        var deferred = q.defer();

        var ObjectId = mongoose.Types.ObjectId;
        fieldId = new ObjectId(fieldId);

        formModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                return doc;
            }
        }).then(function(doc) {
            doc.fields.remove(fieldId);
            return doc.save();
        }).then(function(resp) {
            return resp;
        }).then(function(doc){
            return getFormFields(formId);
        }).then(function(response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    function cloneField(formId, fieldId){

        //console.log(formField);
        var deferred = q.defer();

        var p = formModel.findById(formId);

        p.then(function(response) {
            return response;
        }).then(function(doc) {

            var fields = doc.fields;

            var clonedfield = doc.fields.id(fieldId);

            var formField = new fieldModel({
                label: clonedfield.label,
                type: clonedfield.type,
                placeholder: clonedfield.placeholder,
                options: clonedfield.options
            });

            fields.push(formField);

            doc.fields = fields;
            return doc.save();

        }).then(function(doc){
            return getFormFields(formId);
        }).then(function(response) {

            deferred.resolve(response);
        });
        return deferred.promise;
    }

}