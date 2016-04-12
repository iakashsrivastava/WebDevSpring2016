/**
 * Created by akash on 4/11/16.
 */

module.exports = function(app, articleModel, userModel) {
    app.post("/api/project/user/:userId/article/:articleId", userLikesArticle);
    app.post("/api/project/user/:userId/comment/article/:articleId", userCommentsOnArticle);
    app.get("/api/project/article/:articleId/user", findUserLikes);
    app.get("/api/project/article/details/:articleId", findArticleByarticleID);

    function findUserLikes (req, res) {
        var articleId = req.params.articleId;

        var article = null;
        articleModel
            .findArticleByarticleID(articleId)
            .then (
                function (doc) {
                    article = doc;
                    if (doc) {
                        return userModel.findUsersByIds(article.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    console.log('reste');
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    article.userLikes = users;
                    res.json(article);
                },
                function (err) {
                    console.log('yfqbei');
                    res.status(400).send(err);
                }
            );
    }

    function userLikesArticle(req, res) {
        var articleDB  = req.body;
        console.log(articleDB);
        var userId = req.params.userId;
        var articleId = req.params.articleId;
        console.log(articleId);
        articleModel
            .userLikesArticle(userId, articleDB)
            // add user to movie likes
            .then(
                function (article) {
                    return userModel.userLikesArticle(userId, article);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userCommentsOnArticle(req, res) {
        var articleDB  = req.body;
        console.log(articleDB);
        var userId = req.params.userId;
        var articleId = req.params.articleId;
        console.log(articleId);
        articleModel
            .userCommentsOnArticle(userId, articleDB)
            // add user to movie likes
            .then(
                function (article) {
                    return userModel.userCommentsOnArticle(userId, article);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findArticleByarticleID (req, res) {
        var articleId = req.params.articleId;
        articleModel.findArticleByarticleID(articleId)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    console.log('findArticleByarticleID'+doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }
}