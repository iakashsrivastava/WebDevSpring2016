/**
 * Created by akash on 3/30/16.
 */
/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');

module.exports = function () {

    var api = {
        getCategoryContent: getCategoryContent

    };

    var topics=[
        { "category" : ":news" , value : [407570359384477]},
        { "category" :":entertainment", value : [17614953850]},
        { "category" :":sports", value : [10911153761]},
        { "category" : ":science", value : [96191425588]}
    ];

    var mashup_content=[];

    var url = "https://graph.facebook.com/";
    var fields = "videos.limit(12){picture,title}";
    var fieldsforDetail = "videos.limit(30){picture,title}";
    var accessKey = "1694412377450348|LuFMN9doZ_i3TZMc0p3c3t6X360";

    return api;

    function getCategoryContent(category) {

        for(var i=0;i<mashup_content.length;i++){
            if(mashup_content[i].category === category){
                return Promise.resolve(mashup_content[i].content);
        }}
        var urls = [];
        var id = getCategoryId(category);

        for(var i=0;i<id.length;i++){
            urls.push( url + id[i] + "/?fields=" + fields + "&access_token=" + accessKey );
        }

        return Promise.map(urls, function (url) {    // executes concurrently
            return request(url);
        }).then(function (resultsArray) {
            return formatJson(resultsArray,category);
        });

    }

    function getCategoryId(category){
        for(var i=0;i<topics.length;i++){
            if(topics[i].category === category)
                return topics[i].value;
        }
        return [];
    }

    function formatJson(resultsArray,category){
        var content =[];
        var next = [];
        for(var i=0; i < resultsArray.length; i++) {
            var data =JSON.parse(resultsArray[i]).videos.data;
            next.push(JSON.parse(resultsArray[i]).videos.paging.next);
            for(var j=0;j<data.length;j++){
                content.push(data[j]);
            }
        }
        var obj = {
            category:category,
            content :content,
            next :next};

        mashup_content.push(obj);
        return obj.content;
    }
}