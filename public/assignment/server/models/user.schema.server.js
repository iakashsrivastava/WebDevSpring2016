/**
 * Created by akash on 4/1/16.
 */

/**
 * Created by akash on 3/17/16.
 */

//var mock = require("./user.mock.json");

module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        "_id" :String,
        firstName: String,
        lastName: String,
        username:String,
        password:String
    }, {collection: 'user'});
    return UserSchema;
}