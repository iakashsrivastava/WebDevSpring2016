/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/form.service.server.js")(app);
    require("./services/field.service.server.js")(app);
};