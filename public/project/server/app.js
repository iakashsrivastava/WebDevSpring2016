/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app, db, mongoose) {

    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var contentModel = require("./models/cron.model.server.js")(app);
    var categoryModel = require("./models/category.model.server.js")(app,contentModel);

    var trendCron = require("./models/trends.cron.server.js")(app);
    var trendModel = require("./models/trends.model.server.js")(app,trendCron);

    var contentData = require("./services/category_backup.service.server.js")(app,categoryModel,trendModel);

    var articleModel   = require("./models/article.model.server.js")(db, mongoose);
    var articleService = require("./services/article.service.server.js")(app, articleModel, userModel);

};