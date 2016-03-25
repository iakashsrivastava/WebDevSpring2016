/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function () {

    var api = {
        getContent: getContent
    };
    var url = "https://graph.facebook.com/";
    var fields = "videos.limit(12){picture,title,content_category,updated_time,place,likes.limit(0).summary(true),comments.limit(0).summary(true)}";
    var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";

    return api;

    function getContent(id) {

        var urls = [];
        for(var i=0;i<id.length;i++){
            urls.push( url + id[i] + "/?fields=" + fields + "&access_token=" + accessKey );
        }

        return Promise.map(urls, function (url) {    // executes concurrently
            return request(url);
        }).then(function (resultsArray) {
            return formatJson(resultsArray);
        });

    }

    function formatJson(resultsArray){
        var content =[];
        for(var i=0; i < resultsArray.length; i++) {
            var data =JSON.parse(resultsArray[i]).videos.data;
            for(var j=0;j<data.length;j++){
                content.push(data[j]);
            }
        }
        return content;
    }

}