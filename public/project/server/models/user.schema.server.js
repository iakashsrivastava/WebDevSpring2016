/**
 * Created by akash on 4/8/16.
 */

/**
 * Created by akash on 4/1/16.
 */

module.exports = function(mongoose) {

    var ArticleSchema = require("./article.schema.server.js")(mongoose);

    var UserSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName: String,
        lastName: String,
        emails: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        twitter:   {
            id:    String,
            token: String
        },
        likes: [String],
        comments: [String],
        search: [{
            text: String
        }],
        // movies this user likes
        likesMovies: [ArticleSchema],
        // collection property sets
        // collection name to 'user'
        categories:[String],
        date: { type: Date, default: Date.now },
        roles: [String],
        following: [{
            id: String,
            name: String
        }]

    }, {collection: 'MashupUsers'});
    return UserSchema;
}