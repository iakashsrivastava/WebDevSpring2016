//create an mongodb object;

/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function (app,categoryModel) {

    app.get("/api/content/category/:category/page/:page", getCategoryContent);

    function getCategoryContent(req, res) {
        var category = req.params.category;
        var page = req.params.page;
        var data  = categoryModel.getCategoryData(category,page)
        res.send(data);
    }



};