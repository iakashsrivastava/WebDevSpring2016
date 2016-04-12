/**
 * Created by akash on 4/11/16.
 */

var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load movie schema from movie model
    var ArticleSchema = require("./article.schema.server.js")(mongoose);

    // create movie from schema
    var Article  = mongoose.model("Article", ArticleSchema);

    var articles = [];
    var api = {
        findArticleByarticleID: findArticleByarticleID,
        findArticlesByarticleIDs: findArticlesByarticleIDs,
        createArticle: createArticle,
        userLikesArticle: userLikesArticle,
        userCommentsOnArticle: userCommentsOnArticle
    };
    return api;

    function userCommentsOnArticle(userId, article){
        console.log(JSON.stringify(article));
        var com = article.comments[0];
        var deferred = q.defer();

        // find the movie by imdb ID
        Article.findOne({articleId: article.articleId},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a movie
                if (doc) {
                    // add user to likes
                    doc.comments.push (article.comments[0]);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no movie
                    // create a new instance
                    article = new Article({
                        articleId: article.articleId,
                        title: article.title,
                        thumbnail_url: article.thumbnail_url,
                        description: article.description,
                        likes: [],
                        comments:[]
                    });
                    // add user to likes
                    article.comments.push (com);
                    // save new instance
                    article.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function userLikesArticle (userId, article) {

        var deferred = q.defer();

        // find the movie by imdb ID
        Article.findOne({articleId: article.articleId},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a movie
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no movie
                    // create a new instance
                    article = new Article({
                        articleId: article.articleId,
                        title: article.title,
                        thumbnail_url: article.thumbnail_url,
                        description: article.description,
                        likes: [],
                        comments:[]
                    });
                    // add user to likes
                    article.likes.push (userId);
                    // save new instance
                    article.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findArticlesByarticleIDs (articleIds) {

        var deferred = q.defer();

        // find all movies
        // whose imdb IDs
        // are in imdbIDs array
        Article.find({
            articleId: {$in: articleIds}
        }, function (err, articles) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(articles);
            }
        })
        return deferred.promise;
    }

    function createArticle(article) {

        // create instance of movie
        var article = new Article({
            articleId: article.articleId,
            title: article.title,
            thumbnail_url: article.thumbnail_url,
            description: article.description,
            likes: [],
            comments:[]
        });

        var deferred = q.defer();

        // save movie to database
        article.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findArticleByarticleID(articleId) {

        var deferred = q.defer();

        Article.findOne({articleId: articleId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}