/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {

    app.get("/api/project/home/content",getHomeContent);

    var https = require('https');
    var request = require('request-promise');
    var Promise = require('bluebird');

    var url = "https://graph.facebook.com/";
    var id = [407570359384477];
    var fields = "videos.limit(12){picture,title,content_category,updated_time,place,likes.limit(0).summary(true),comments.limit(0).summary(true)}";
    var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";
    var allContent = [];

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

};