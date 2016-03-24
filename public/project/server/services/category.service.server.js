/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function(app) {
    var categoryModel = require("./../models/category.model.js")();

    app.get("/api/category/news/content",getNewsContent);
    app.get("/api/category/entertaintment/content",getEntertaintmentContent);
    app.get("/api/category/science/content",geScienceContent);
    app.get("/api/category/sports/content",getSportsContent);

    var newsContent=[];
    var newsId = [407570359384477];

    var entertaintmentContent=[];
    var entertaintmentId = [17614953850];

    var sportsContent=[];
    var sportsId = [10911153761];

    var scienceContent=[];
    var scienceId = [96191425588];


    function getNewsContent(req, res){

        if (newsContent.length > 0) {
            console.log("Inside if")
            res.send(newsContent);
        }
        else {
            console.log("Inside else")
            categoryModel.getContent(newsId)
                .then(
                    function (result) {

                        newsContent = result;
                        res.send(newsContent);
                    }
                );
        }
    }

    function getEntertaintmentContent(req, res){

        if (entertaintmentContent.length > 0) {
            console.log("Inside if")
            res.send(entertaintmentContent);
        }
        else {
            console.log("Inside else")
            categoryModel.getContent(entertaintmentId)
                .then(
                    function (result) {

                        entertaintmentContent = result;
                        res.send(entertaintmentContent);
                    }
                );
        }
    }

    function geScienceContent(req, res){

        if (scienceContent.length > 0) {
            console.log("Inside if")
            res.send(scienceContent);
        }
        else {
            console.log("Inside else")
            categoryModel.getContent(scienceId)
                .then(
                    function (result) {

                        scienceContent = result;
                        res.send(scienceContent);
                    }
                );
        }
    }

    function getSportsContent(req, res){

        if (sportsContent.length > 0) {
            console.log("Inside if")
            res.send(sportsContent);
        }
        else {
            console.log("Inside else")
            categoryModel.getContent(sportsId)
                .then(
                    function (result) {

                        sportsContent = result;
                        res.send(sportsContent);
                    }
                );
        }
    }


};