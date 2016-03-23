/**
 * Created by akash on 3/17/16.
 */

module.exports = function() {
    var https = require('https');
    var request = require('request-promise');
    var Promise = require('bluebird');

    var api = {
        getHomeContent :getHomeContent

    };

    return api;

    function getHomeContent(){
        var url = "https://graph.facebook.com/";
        var id = [407570359384477];
        var fields = "videos{picture,title}";
        var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";

        var string1 = url +id + "/?fields=" + "&access_token=" + accessKey;
        var string = 'https://graph.facebook.com/407570359384477/?fields=videos{picture,title}&access_token=1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360';

        var urls = [string];


        Promise.map(urls, function(url){    // executes concurrently
            return request(url)
        }).then(function(resultsArray){
            return resultsArray;
        });

    }

    }


