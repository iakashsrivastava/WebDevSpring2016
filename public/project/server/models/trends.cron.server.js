/**
 * Created by akash on 4/5/16.
 */
module.exports = function (app) {
    var Twitter = require('twitter');
    var request = require('request-promise');
    var Promise = require('bluebird');


    console.log("Inside Twitter Model");

    var topics=[
        { "Location" : "Worldwide" , id : 1, content :[]}
        //{ "Location" : "India" , id : 23424848, content :[]},
        //{ "Location" : "Delhi" , id : 20070458, content :[]},
        //{ "Location" : "Mumbai" , id : 2295411, content :[]},
        //{ "Location" : "Chennai" , id : 2295424, content :[]},
        //{ "Location" : "Pune" , id : 2295420, content :[]}
        //{ "Location" : "Hyderabad" , id : 2295414, content :[]},
        //{ "Location" : "Pune" , id : 2295412, content :[]},
        //{ "Location" : "Srinagar" , id : 2295387, content :[]},
        //{ "Location" : "Indore" , id : 2295408, content :[]},
        //{ "Location" : "Kolkata" , id : 2295386, content :[]},
        //{ "Location" : "Lucknow" , id : 2295377, content :[]},
        //{ "Location" : "Ahmedabad" , id : 2295402, content :[]},
        //{ "Location" : "Jaipur" , id : 2295401, content :[]},
        //{ "Location" : "Amritsar" , id : 2295388, content :[]}
    ];

    var alltrendTweets=[
        { "Location" : "Worldwide" ,content :[]}
        //{ "Location" : "India" , id : 23424848, content :[]},
        //{ "Location" : "Delhi" , id : 20070458, content :[]},
        //{ "Location" : "Mumbai" , id : 2295411, content :[]},
        //{ "Location" : "Chennai" , id : 2295424, content :[]},
        //{ "Location" : "Pune" , id : 2295420, content :[]}
        //{ "Location" : "Hyderabad" , id : 2295414, content :[]},
        //{ "Location" : "Pune" , id : 2295412, content :[]},
        //{ "Location" : "Srinagar" , id : 2295387, content :[]},
        //{ "Location" : "Indore" , id : 2295408, content :[]},
        //{ "Location" : "Kolkata" , id : 2295386, content :[]},
        //{ "Location" : "Lucknow" , id : 2295377, content :[]},
        //{ "Location" : "Ahmedabad" , id : 2295402, content :[]},
        //{ "Location" : "Jaipur" , id : 2295401, content :[]},
        //{ "Location" : "Amritsar" , id : 2295388, content :[]}
    ];

    var api ={
        getLocationTrendingData: getLocationTrendingData
    }

    loadTrendingDataForAllLocations();

    return api;

    function loadTrendingDataForAllLocations(){
        console.log("loading Trending Data For Al lLocations.....")
        for(var i=0; i<topics.length; i++){
            loadLocationData(topics[i].id , i);
        }
    }

    function loadLocationData(id, i){

        client.get('trends/place', {id: id}, function(err, reply) {
            if (err) {
                // reject promise if error
                console.log(err);
            } else {
                // resolve promise
                formatJson(reply , i);
            }
        });
    }

    function formatJson(resultsArray , position){
        //console.log(JSON.stringify(resultsArray));
        var content =[];
        var trendsName =[];
        var trends = resultsArray[0].trends;
        for(var i=0; i < trends.length; i++){
            content.push(trends[i]);
            if(i<2)
                trendsName.push(trends[i].name)
        }

        topics[position].content.splice(0,0,content);

        if(topics[position].content.length > 20){
            topics[position].content.splice(topics[position].content.length-1,1);
        }
        console.log(topics[position].content[0].length);
        //loadTrendingTweetsforalltrends(trendsName,position);

        //topics[position].content.push(content);
        //
        //topics[position].content.push(content);
        //topics[position].content.push(content);
        //topics[position].content.push(content);
    }

    function loadTrendingTweetsforalltrends(trendsName,position){
        alltrendTweets[position].content =[];

        for(var counter =0; counter<trendsName.length; counter++){
            loadTweetsfortrend(trendsName[counter], position);
        }

    }

    function loadTweetsfortrend(topic,position){

        client.get('search/tweets', {q: topic}, function (error, tweets, response) {
            ids=[];
            for(var i=0; i<tweets.statuses.length;i++) {
                ids.push(tweets.statuses[i].id_str);
            }
            getOmbedJson(topic,ids,position);
        });
    }

    function getOmbedJson(topic,ids,position){
        var objects =[];

        Promise.map(ids, function(id) {
            // Promise.map awaits for returned promises as well.
            client.get('statuses/oembed.json', {id: id}, function (error, embed) {
                console.log("from :" + embed.html);
                return embed.html;
            });
        }).then(function(res) {
            objects.push(res);
        });

        alltrendTweets[position].content.push({
            topic: topic,
            objects : objects
        });

        console.log(topic );
        console.log("===========================")
        console.log(objects);
    }

    function getLocationTrendingData(Location){
        console.log("Get Trending Data")
        for(var i=0; i< topics.length; i++){
            console.log(topics[i].Location);
            if(topics[i].Location === Location) {
                console.log("Matched");
                return topics[i].content;
            }
        }
    }

}