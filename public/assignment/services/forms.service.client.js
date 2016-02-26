/**
 * Created by akash on 2/25/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    var formData= [
        {"_id": "000", "title": "Contacts", "userId": 123},
        {"_id": "010", "title": "ToDo",     "userId": 123},
        {"_id": "020", "title": "CDs",      "userId": 234},
        ]

    function FormService(){

        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }

        return api;

        function createFormForUser(userId, title, callback){
            var id= (new Date).getTime();
            var obj = {
                _id:id ,
                title:title,
                userId:userId
            };

            formData.push(obj);

            callback(obj);
        }

        function findAllFormsForUser(userId, callback) {
            var array = [];
            for (index = 0; index < formData.length; index++) {
                if (formData[index].userId === userId) {
                    array.push(formData[index]);
                }
            }
            callback(array);
        }

        function deleteFormById(formId, callback1){
            var pos =-1;
            var uid =-1;
            for	(index = 0; index < formData.length; index++) {
                if( formData[index]._id === formId){
                    pos=index;
                    uid=formData[index].userId;
                    break;
                }
            }
            if(pos !== -1)
                formData.splice(index,1);

            findAllFormsForUser(uid,callback);
            function callback(response){
                callback1(response);
            }
        }

        function updateFormById(formId, newForm, callback){

            for	(index = 0; index < formData.length; index++) {
                if( formData[index]._id === formId){
                    formData[index] = newForm;
                }
            }
            callback(newForm);
        }

    }
})();