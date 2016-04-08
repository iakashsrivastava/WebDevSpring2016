/**
 * Created by akash on 4/6/16.
 */

module.exports = function (app,trendsCron) {

    var api = {
        getTrendsData: getTrendsData
    };

    return api;

    function getTrendsData(location,counter){

        trends_data = trendsCron.getTrendingData(location);
        //content =[]
        //var limit = parseInt(counter) + 4;
        //for( var i=counter; i < limit ; i++) {
        //    console.log(i);
        //    content.push(trends_data[i]);
        //}
        return trends_data;
    }

}
