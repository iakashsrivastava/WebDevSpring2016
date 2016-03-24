/**
 * Created by akash on 3/17/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function(app) {
    var homeModel = require("./../models/home.model.js")();

    app.get("/api/project/home/content",getHomeContent1);

    var url = "https://graph.facebook.com/";
    var id = [407570359384477];
    var fields = "videos.limit(12){picture,title,content_category,updated_time,place,likes.limit(0).summary(true),comments.limit(0).summary(true)}";
    var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";
    var string1 = url +id[0] + "/?fields=" +fields+ "&access_token=" + accessKey;

    function getHomeContent(req, res){
        var allContent = [];
        var urls = [string1];
        Promise.map(urls, function(url){    // executes concurrently
            return request(url)
        }).then(function(resultsArray){

            for(var i=0; i < resultsArray.length; i++) {

                var data =JSON.parse(resultsArray[i]).videos.data;
                for(var j=0;j<data.length;j++){
                    allContent.push(data[j]);
                }
            }
            res.send(allContent);

        });
    }

    function getHomeContent1(req, res){
//        var result = homeModel.getHomeContent();
        homeModel.getHomeContent()
            .then(
                function(result){
                    console.log("From Services " + result)
                    res.send(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        //res.send(result);
    }


};