/**
 * Created by akash on 3/30/16.
 */

var CronJob = require('cron').CronJob;
var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function () {

    var api = {
        getCategoryData:getCategoryData
    };

    var topics=[
        { "category" : "News" , id : [407570359384477], content :[]},
        { "category" : "Entertainment", id : [17614953850], content : []},
        { "category" : "Sports", id : [10911153761], content : []},
        { "category" : "Science", id : [96191425588], content : []}
    ];

    var url = "https://graph.facebook.com/";
    var fields = "videos.limit(60){picture,title}";
    var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";

    var job = new CronJob({
        cronTime: '00 00 */1 * * *',
        onTick: getContent,
        start: false,
        timeZone: 'America/Los_Angeles'
    });

    getContent();

    return api;

    function getContent(){

        console.log((new Date).toLocaleTimeString() )
        for (var i =0; i< topics.length; i++){
            var category = topics[i].category;
            var id = topics[i].id;
            getCategoryContent(id, i)
                .then(
                    function (result) {
                        position = result.position;
                        topics[position].content = result.content;
                    });
        }
    }

    function getCategoryContent( id , position) {

        var urls = [];

        for(var i=0;i<id.length;i++){
            urls.push( url + id[i] + "/?fields=" + fields + "&access_token=" + accessKey );
        }

        return Promise.map(urls, function (url) {    // executes concurrently
            return request(url);
        }).then(function (resultsArray) {
            return formatJson(resultsArray, position);
        });

    }

    function formatJson(resultsArray , position){
        var content =[];
        var next = [];
        for(var i=0; i < resultsArray.length; i++) {
            var data =JSON.parse(resultsArray[i]).videos.data;
            next.push(JSON.parse(resultsArray[i]).videos.paging.next);
            for(var j=0;j<data.length;j++){
                content.push(data[j]);
            }
        }

        return { content: content,
                position: position
        };
    }

    function getCategoryData(category){
        for(var i=0; i< topics.length; i++){
            if(topics[i].category === category)
                return topics[i].content;
        }
    }

}
