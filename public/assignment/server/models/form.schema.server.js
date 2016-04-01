/**
 * Created by akash on 4/1/16.
 */

module.exports = function(db,mongoose) {

    var FormSchema = mongoose.Schema({
        "_id" :String,
        title: String,
        userId: String,
        fields:[String]
    }, {collection: 'form'});
    return FormSchema;

}