//create an mongodb object;

/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function (app,categoryModel,trendModel) {

    app.get("/api/content/category/:category/page/:page", getCategoryContent);
    app.get("/api/detail/category/:category/page/:page", getCategoryDetails);
    app.get("/api/content/trends/data", getallTrends);

    function getCategoryContent(req, res) {
        var category = req.params.category;
        var page = req.params.page;
        var data  = categoryModel.getCategoryData(category,page)
        res.send(data);
    }

    function getCategoryDetails(req, res) {
        var category = req.params.category;
        var page = req.params.page;
        var data  = categoryModel.getCategoryDetails(category,page)
        res.send(data);
    }

    function getallTrends(req, res) {
        var data  = trendModel.getTrendingData();
        res.send(data);
    }



};