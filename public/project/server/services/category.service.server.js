/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function(app) {
    var categoryModel = require("./../models/category.model.js")();

    app.get("/api/category/news/content",getNewsContent);
    app.get("/api/category/news/detail",getNewsDetail);
    app.get("/api/category/entertainment/content",getEntertainmentContent);
    app.get("/api/category/science/content",geScienceContent);
    app.get("/api/category/sports/content",getSportsContent);

    var newsContent=[];
    var newsNext=[];
    var newsId = [407570359384477];

    var entertainmentContent=[];
    var entertainmentNext=[];
    var entertainmentId = [17614953850];

    var sportsContent=[];
    var sportsNext=[];
    var sportsId = [10911153761];

    var scienceContent=[];
    var scienceNext=[];
    var scienceId = [96191425588];


    function getNewsContent(req, res){

        if (newsContent.length > 0) {
            res.send(newsContent);
        }
        else {
            categoryModel.getContent(newsId)
                .then(
                    function (result) {
                        newsNext =result.next;
                        newsContent = result.content;
                        res.send(newsContent);
                    }
                );
        }
    }

    function getNewsDetail(req, res){

        categoryModel.getDetailedContent(newsNext)
            .then(
                function (result) {
                    newsNext =result.next;
                    newsContent.push(result.content);
                    res.send(newsContent);
                }
            );

    }

    function getEntertainmentContent(req, res){

        if (entertainmentContent.length > 0) {
            res.send(entertainmentContent);
        }
        else {
            categoryModel.getContent(entertainmentId)
                .then(
                    function (result) {
                        entertainmentNext =result.next;
                        entertainmentContent = result.content;
                        res.send(entertainmentContent);
                    }
                );
        }
    }

    function geScienceContent(req, res){

        if (scienceContent.length > 0) {
            res.send(scienceContent);
        }
        else {
            categoryModel.getContent(scienceId)
                .then(
                    function (result) {
                        scienceNext =result.next;
                        scienceContent = result.content;
                        res.send(scienceContent);
                    }
                );
        }
    }

    function getSportsContent(req, res){

        if (sportsContent.length > 0) {
            res.send(sportsContent);
        }
        else {
            categoryModel.getContent(sportsId)
                .then(
                    function (result) {
                        sportsNext =result.next;
                        sportsContent = result.content;
                        res.send(sportsContent);
                    }
                );
        }
    }

};