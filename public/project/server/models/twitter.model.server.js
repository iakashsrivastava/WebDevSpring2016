/**
 * Created by akash on 4/5/16.
 */
module.exports = function (app) {
    var Twitter = require('twitter');
    var q = require('q');


    console.log("Inside Twitter Model");

    var topics=[
        { "Location" : "Worldwide" , id : 1, content :[]},
        { "Location" : "India" , id : 23424848, content :[]},
        //{ "Location" : "Delhi" , id : 20070458, content :[]}
        //{ "Location" : "Mumbai" , id : 2295411, content :[]},
        //{ "Location" : "Chennai" , id : 2295424, content :[]},
        //{ "Location" : "Bangalore" , id : 2295420, content :[]},
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

    console.log("Inside Twitter Model");
    loadTrendingData()
    return api;

    function loadTrendingData(){
        console.log("Loading Data.....")
        for(var i=0; i<topics.length; i++){
            loadLocationData(topics[i].id , i)
                // handle model promise
                .then(
                    // login user if promise resolved
                    function ( response ) {
                        var counter = response.counter;
                        topics[counter].content = response.content;
                        res.send(doc);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );

        }

    }

    function loadLocationData(id, i){
        var deferred = q.defer();
        // find without first argument retrieves all documents
        client.get('trends/place', {id: id}, function(err, reply) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                var obj={
                    counter: i,
                    content: reply
                }
                deferred.resolve(obj);
            }
        });
        return deferred.promise;
    }


    function getTrendingData(){
        return topics;
    }
}