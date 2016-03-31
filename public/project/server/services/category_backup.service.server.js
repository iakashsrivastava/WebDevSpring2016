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
    app.get("/api/category/detail/:category",getCategoryDetails);

    function getCategoryContent(req, res) {
        var category = req.params.category;
        categoryModel.getCategoryContent(category)
            .then(
                function (result) {
                    res.send(result);
                });
    }

    function getUserCategories(req,res){
        categoryModel.getCategoryContent(category)
            .then(
                function (result) {
                    res.send(result);
                });
    }

    function getCategoryDetails(req, res){
        var category = req.params.category;

        if (next.length == 0){
            console.log("Inside");
            categoryModel.getDetailedContent(newsId)
                .then(
                    function (result) {
                        next = result.next;
                        scienceNext={
                            obj:result.content
                        }
                        res.send(result.content);
                    }
                );
        }
        else{
            res.send(scienceNext.obj)
        }

    }


};