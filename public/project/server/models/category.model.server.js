/**
 * Created by akash on 4/4/16.
 */

/**
 * Created by akash on 3/24/16.
 */

var data = require("./cron.model.server.js");

module.exports = function () {

    var api = {
        getCategoryData: getCategoryData
    };

    return api;

    function getCategoryData(category,counter , detailed){

        if(detailed === true)
            limit = counter + 10;
        else
            limit = counter +6;
                             getCategoryData
        category_data = data.getCategoryData(category);
        content =[]
        for( var i=counter; i <limit; i++)
            content.push(category[i]);

        return content;
    }


}
