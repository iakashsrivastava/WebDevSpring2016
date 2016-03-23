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
    var fields = "videos{picture,title}";
    var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";
    var allContent = [];

    function getHomeContent(req, res){
        var string = 'https://graph.facebook.com/407570359384477/?fields=videos{picture,title}&access_token=1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360';

        var urls = [string, string,string];
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