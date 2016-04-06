/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {

    var contentModel = require("./models/cron.model.server.js")(app);
    var categoryModel = require("./models/category.model.server.js")(app,contentModel);

    var trendCron = require("./models/trends.cron.server.js")(app);
    var trendModel = require("./models/trends.model.server.js")(app,trendCron);

    var contentData = require("./services/category_backup.service.server.js")(app,categoryModel,trendModel);



};