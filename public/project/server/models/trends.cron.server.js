/**
 * Created by akash on 4/5/16.
 */
module.exports = function (app) {
    var Twitter = require('twitter');

    console.log("Inside Twitter Model");

    var topics=[
        { "Location" : "Worldwide" , id : 1, content :[]},
        { "Location" : "India" , id : 23424848, content :[]},
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
        getTrendingData: getTrendingData
    }

    loadTrendingData()

    return api;

    function loadTrendingData(){
        console.log("Loading Data.....")
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
        var trends = resultsArray[0].trends;
        for(var i=0; i < trends.length; i++) {
            content.push(trends[i]);
        }
        //console.log(content);

        topics[position].content.push(content);
        topics[position].content.push(content);
        topics[position].content.push(content);
        topics[position].content.push(content);
    }

    function getTrendingData(Location){
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