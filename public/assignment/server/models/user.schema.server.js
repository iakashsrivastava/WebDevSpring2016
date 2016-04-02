/**
 * Created by akash on 4/1/16.
 */

/**
 * Created by akash on 3/17/16.
 */

//var mock = require("./user.mock.json");

module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]

    }, {collection: 'user'});
    return UserSchema;
}