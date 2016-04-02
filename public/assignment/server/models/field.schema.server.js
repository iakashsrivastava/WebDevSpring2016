/**
 * Created by akash on 4/1/16.
 */

module.exports = function(mongoose) {

    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']
        },
        placeholder: String,
        options:[{label:String, value:String}]
    });


    return FieldSchema;

};
