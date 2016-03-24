/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {
    require("./services/entertaintment.service.server.js")(app);
    require("./services/home.service.server.js")(app);
    require("./services/science.service.server.js")(app);
    require("./services/sports.service.server.js")(app);
};