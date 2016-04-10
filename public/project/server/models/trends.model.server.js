/**
 * Created by akash on 4/6/16.
 */

module.exports = function (app,trendsCron) {

    var api = {
        getLocationTrends: getLocationTrends,
        getTopicTweets:getTopicTweets,
        getTopLocationTrends :getTopLocationTrends
    };

    return api;

    function getTopLocationTrends(location){

        trends_data = trendsCron.getLocationTrendingData(location);
        content =[]
        var limit = 12;
        for( var i=0; i < limit ; i++)
            content.push(trends_data[0][i]);
        return content;

    }

    function getLocationTrends(location){

        trends_data = trendsCron.getLocationTrendingData(location);
        content =[]
        var limit = 4;
        for( var i=0; i < limit ; i++) {

            content.push(trends_data[0]);
        }
        return content;
    }

    function getTopicTweets(topic, location){
        console.log('model getTopicTweets '+ location + topic);
        data = trendsCron.getTopicTweets(location, topic);
        console.log("data: model" + data);
        return data;
    }

}
