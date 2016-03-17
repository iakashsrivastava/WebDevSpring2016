/**
 * Created by akash on 3/17/16.
 */

var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;
}