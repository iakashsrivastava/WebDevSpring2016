/**
 * Created by akash on 3/17/16.
 */

//var formModel = require("./form.mock.json");
var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db,mongoose) {
    var uide = null;
    var FormSchema = require("./form.schema.server.js")(mongoose);

    //create model for schema
    var formModel = mongoose.model('form', FormSchema);

    var api = {
        getUserForms : getUserForms,
        getForm : getForm,
        createForm:createForm,
        updateForm: updateForm,
        deleteForm:deleteForm,
        getMongooseModel: getMongooseModel


    };

    return api;

    function getUserForms(userId){

        var deferred = q.defer();
        uide = userId;
        // find without first argument retrieves all documents
        formModel.find({ userId: userId }, function(err, docs) {
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

    function getForm(formId){

        var deferred = q.defer();
        // find without first argument retrieves all documents
        formModel.findbyId(formId, function(err, docs) {
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

    function createForm(userId,form){

        var form = {
            title: form.title,
            userId: userId,
            fields:[]
        }
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        formModel.create(form, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                return doc;
            }

        }).then(function(doc){
            getUserForms(userId).then(
                function(docs) {

                    deferred.resolve(docs);
                },
                function(err) {
                    deferred.reject(err);
                }
            )
        });

        // return a promise
        return deferred.promise;

        //var userForms = getUserForms(userId);
        //return userForms;
    }

    function updateForm(formId,title){
        var userId =null;
        var deferred = q.defer();
        formModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                userId = doc.userId;
                return doc;
            }
        }).then(function(doc) {
            doc.title = title;
            doc.save(function(err, resp) {
                if(err) {
                    deferred.reject(err);
                } else {
                    return doc;
                }
            });
        }).then(function(doc){
            getUserForms(userId).then(
                function(docs) {
                    deferred.resolve(docs);
                },
                function(err) {
                    deferred.reject(err);
                }
            )
        });

        // return a promise
        return deferred.promise;

    }

    function deleteForm(formId){
        var deferred = q.defer();

        formModel.remove({_id: formId}, function (err, resp) {
            if (err) {
                deferred.reject(err);
            } else {
                return resp;
            }
        }).then(function(resp){
            getUserForms(uide).then(
                function(docs) {
                    deferred.resolve(docs);
                },
                function(err) {
                    deferred.reject(err);
                }
            )
        });

        return deferred.promise;
    }

    function getMongooseModel(){
        return formModel;
    }

};