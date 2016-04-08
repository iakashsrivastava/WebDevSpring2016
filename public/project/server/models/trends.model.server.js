/**
 * Created by akash on 4/6/16.
 */

module.exports = function (app,trendsCron) {

    var api = {
        getTrendsData: getTrendsData,
        getTopicTweets:getTopicTweets
    };

    return api;

    function getTrendsData(location,counter){

        trends_data = trendsCron.getLocationTrendingData(location);
        //content =[]
        //var limit = parseInt(counter) + 4;
        //for( var i=counter; i < limit ; i++) {
        //    console.log(i);
        //    content.push(trends_data[i]);
        //}
        return trends_data;
    }

    function getTopicTweets(topic){
        client.get('search/tweets', {q: topic,result_type:'popular'}, function (error, tweets, response) {
            for(var i=0; i<tweet.statuses.length;i++) {
                console.log("=================================================");
                console.log(tweets.statuses[i].id_str);
                console.log(tweets.statuses[i].retweet_count);
                console.log(tweets.statuses[i].favorite_count);
            }
        });
    }

}
