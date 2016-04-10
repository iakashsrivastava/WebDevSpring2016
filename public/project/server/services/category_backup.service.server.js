//create an mongodb object;

/**
 * Created by akash on 3/24/16.
 */

var https = require('https');
var request = require('request-promise');
var Promise = require('bluebird');
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'DvXFFgAHw0x71SWT81SLz3myM',
    consumer_secret: '4Y13VpNvvctsCRUDKwnAEMZ9YlzNRmHsImkIAJSQo5GanRnOTH',
    access_token_key: '717497901220569088-N9SkG4PfpOf3msh6A3FOWvgFHGNBpqd',
    access_token_secret: 'l0Qflg7c0nxkgQacoPQDdhX4PjFXfjQ4uLyyOeX7MCxfO'
});

module.exports = function (app,categoryModel,trendModel) {

    app.get("/api/content/category/:category/page/:page", getCategoryContent);
    app.get("/api/detail/category/:category/page/:page", getCategoryDetails);
    app.get("/api/content/trends/:location", getLocationTrends);
    app.get("/api/content/trends/top/:location", getTopLocationTrends);
    app.get("/api/content/location/:location/topic/:topic", getTopicTweets);
    app.get("/api/content/location/:location/topicwithhash/:topic", getTopicHashTweets);
    app.get("/api/all/trends/:trending", getLocationTrends1);

    function getTopLocationTrends(req, res) {
        var location = req.params.location;
        var data  = trendModel.getTopLocationTrends(location);
        res.send(data);
    }

    function getCategoryContent(req, res) {
        var category = req.params.category;
        var page = req.params.page;
        var data  = categoryModel.getCategoryData(category,page)
        res.send(data);
    }

    function getCategoryDetails(req, res) {
        var category = req.params.category;
        var page = req.params.page;
        var data  = categoryModel.getCategoryDetails(category,page)
        res.send(data);
    }

    function getLocationTrends(req, res) {
        var location = req.params.location;
        var data  = trendModel.getLocationTrends(location,0);
        res.send(data);
    }

    function getTopicTweets(req,res){
        var topic = req.params.topic;
        var location = req.params.location;
        var data  = trendModel.getTopicTweets(topic, location);
        res.send(data);
    }

    function getTopicHashTweets(req,res){
        var topic = '#' + req.params.topic;
        var location = req.params.location;
        var data  = trendModel.getTopicTweets(topic, location);
        res.send(data);
    }

    function getLocationTrends1(req, res) {
        var topic = req.params.trending;
        client.get('search/tweets', {q: topic,result_type:'popular'}, function (error, tweets, response) {
            console.log(tweets.statuses[0].id_str);
            console.log(tweets.statuses[0].retweet_count);
            console.log(tweets.statuses[0].favorite_count);
            res.send(tweets);
        });
        //client.get('statuses/oembed.json', {id: '718148816025858048'}, function (error, embed) {
        //    res.send(embed);
        //});
    }

};