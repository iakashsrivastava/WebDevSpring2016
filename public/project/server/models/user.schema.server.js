/**
 * Created by akash on 4/8/16.
 */

/**
 * Created by akash on 4/1/16.
 */

module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]

    }, {collection: 'MashupUsers'});
    return UserSchema;
}