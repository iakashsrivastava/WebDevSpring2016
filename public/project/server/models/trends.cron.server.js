/**
 * Created by akash on 4/5/16.
 */
module.exports = function (app) {
    var Twitter = require('twitter');
    var request = require('request-promise');
    var Promise = require('bluebird');


    console.log("Inside Twitter Model");

    var topics=[
        { "Location" : "Worldwide" , id : 1, content :[]},
        { "Location" : "India" , id : 23424848, content :[]}
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
        { "Location" : "Worldwide" ,content :[]},
        { "Location" : "India" , content :[]},
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
        getLocationTrendingData: getLocationTrendingData,
        getTopicTweets: getTopicTweets
    }

    loadTrendingDataForAllLocations();

    return api;

    function loadTrendingDataForAllLocations(){
        console.log("loading Trending Data For Al Locations.....")
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
            if(i<12)
                trendsName.push(trends[i].name)
        }

        topics[position].content.splice(0,0,content);

        if(topics[position].content.length > 20){
            topics[position].content.splice(topics[position].content.length-1,1);
        }
        loadTrendingTweetsforalltrends(trendsName,position);
    }

    function loadTrendingTweetsforalltrends(trendsName,position){
        alltrendTweets[position].content =[];

        for(var counter =0; counter<trendsName.length; counter++){
            loadTweetsfortrend(trendsName[counter], position);
        }
    }

    function loadTweetsfortrend(topic,position){
        client.get('search/tweets', {q: topic}, function (error, tweets, response) {
            //ids = [];
            //users =[];
            //retweet_count =[];
            //favorite_count =[];
            details = [];
            for(var i=0; i<tweets.statuses.length;i++) {
                //ids.push(tweets.statuses[i].id_str)
                //users.push(tweets.statuses[i].user.screen_name);
                //retweet_count.push(tweets.statuses[i].retweet_count);
                //favorite_count.push(tweets.statuses[i].favorite_count);
                var obj = {
                    id : tweets.statuses[i].id_str,
                    name: tweets.statuses[i].user.screen_name,
                    rt: tweets.statuses[i].retweet_count,
                    fc:tweets.statuses[i].favorite_count
                }
                details.push(obj);
            }

            details = details.sort(function(a, b){
                    return b.rt - a.rt
            })

            alltrendTweets[position].content.push({
                name: topic,
                content: details
            });

        });
    }

    //function getOmbedJson(ids){
    //    return Promise.map(ids, function(id) {
    //        client.get('statuses/oembed.json', {id: id}, function (error, embed) {
    //            //console.log(embed.html);
    //            return embed.html;
    //        });
    //    }).then(function(res) {
    //        return res ;
    //    });
    //
    //}

    function getLocationTrendingData(Location){
        console.log("Get Trending Data")
        for(var i=0; i< topics.length; i++){
            console.log(topics[i].Location);
            console.log(Location);
            if(topics[i].Location === Location) {
                console.log("Matched");
                return topics[i].content;
            }
        }
    }

    function getTopicTweets(location, topic){
        console.log('CRON getLocationTrendingData '+location + topic);
        for(var i=0; i<alltrendTweets.length;i++){
            if(alltrendTweets[i].Location === location){
                console.log('CRON Location Matched');
                console.log(JSON.stringify(alltrendTweets[i].content));

                for(var j=0; j<alltrendTweets[i].content.length; j++){
                    if(topic === alltrendTweets[i].content[j].name){
                        console.log('CRON topic Matched');
                        //return {
                        //    ids : alltrendTweets[i].content[j].ids,
                        //    users : alltrendTweets[i].content[j].users
                        //};
                        return alltrendTweets[i].content[j];
                    }
                }
            }
        }
    }

    //function getombedObjects(posParent, posChild, ids,topic){
    //    for(var i=0;i<ids.length;i++) {
    //        client.get('statuses/oembed.json', {id: ids[i]}, function (error, embed) {
    //            console.log(topic +'\n '+embed.html);
    //            alltrendTweets[posParent].content[posChild].objects.push(embed.html)
    //        });
    //    }
    //}

}