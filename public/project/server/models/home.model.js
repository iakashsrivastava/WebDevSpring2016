/**
 * Created by akash on 3/17/16.
 */

module.exports = function() {
    var https = require('https');

    var api = {
        getHomeContent :getHomeContent

    };

    return api;

    function getHomeContent(){
        var responseObject = {};
        var url = "https://graph.facebook.com/";
        var id = [407570359384477];
        var fields = "videos{picture,title}";
        var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";

        var string1 = url +id + "/?fields=" + "&access_token=" + accessKey;
        var string = 'https://graph.facebook.com/407570359384477/?fields=videos{picture,title}&access_token=1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360';

        console.log('start http');
        https.get(string, function(res) {

            var responseString = '';

            res.on('data', function(data) {
                console.log('start http');
                responseString += data;
            });

            res.on('end', function() {
                console.log('end http');
                responseObject = JSON.parse(responseString);
                console.log(JSON.stringify(responseObject));
            })
        });

    }

    }


