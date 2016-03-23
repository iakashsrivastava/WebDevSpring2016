/**
 * Created by akash on 3/17/16.
 */

module.exports = function(app) {

    var userModel = require("./../models/home.model.js")();
    var responseObject=null;
    var https = require('https');
    var string = 'https://graph.facebook.com/407570359384477/?fields=videos{picture,title}&access_token=1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360';




    app.get("/api/project/home/content",getHomeContent);

    function getHomeContent(req, res){
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
        res.send(responseObject);
    }

};