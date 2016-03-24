/**
 * Created by akash on 3/18/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function () {

    var api = {
        getHomeContent: getHomeContent
    };

    return api;

    function getHomeContent() {

        var url = "https://graph.facebook.com/";
        var id = [407570359384477];
        var fields = "videos.limit(12){picture,title,content_category,updated_time,place,likes.limit(0).summary(true),comments.limit(0).summary(true)}";
        var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";
        var allContent = [];
        var string1 = url + id[0] + "/?fields=" + fields + "&access_token=" + accessKey;
        var allContent;
        var urls = [string1,string1];

        return Promise.map(urls, function (url) {    // executes concurrently
            return request(url);
        });
        //    .then(function (resultsArray) {
        //
        //    console.log("From Models " + resultsArray);
        //    return resultsArray;
        //});

    }

}