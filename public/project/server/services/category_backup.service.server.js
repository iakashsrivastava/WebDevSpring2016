//create an mongodb object;

/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function (app,contentModel) {

    app.get("/api/content/category/:category", getCategoryContent);

    function getCategoryContent(req, res) {
        var category = req.params.category;

        var data  = contentModel.getCategoryData(category,0,false)
        res.send(data);
    }



};