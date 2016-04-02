//create an mongodb object;

/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function (app) {
    var categoryModel = require("./../models/category_new.model.js")();

    app.get("/api/content/category/:category", getCategoryContent);
    app.get("/api/content/category/:category", getUserCategories);
    app.get("/api/category/detail/:category",getCategoryDetailedContent);

    function getCategoryContent(req, res) {
        var category = req.params.category;
        categoryModel.getCategoryContent(category)
            .then(
                function (result) {
                    res.send({
                        item: result,
                        name: category
                    });
                });
    }

    function getUserCategories(req,res){
        categoryModel.getCategoryContent(category)
            .then(
                function (result) {
                    res.send(result);
                });
    }

    function getCategoryDetailedContent(req, res) {
        var category = req.params.category;
        console.log(category);
        categoryModel.getDetailedContent(category)
            .then(
                function (result) {
                    res.send(result);
                });
    }


};