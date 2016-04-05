/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {

    var contentModel = require("./models/cron.model.server.js")(app);

    var contentData = require("./services/category_backup.service.server.js")(app,contentModel);
    //require("./services/user.service.server.js")(app);


};