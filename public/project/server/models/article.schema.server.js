/**
 * Created by akash on 4/11/16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var ArticleSchema = mongoose.Schema({
        articleId: String,
        title: String,
        description: String,
        thumbnail_url: String,
        source: String,
        // ids of users that like this movie
        likes: [String],
        // list of users that like this movie
        comments:[{
            id: String,
            comments: String,
            name: String
        }],
        userLikes: [
            {username: String}
        ],
        // store movie documents in this collection
    }, {collection: 'project.mashup.article'});

    return ArticleSchema;

};