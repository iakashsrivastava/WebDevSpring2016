/**
 * Created by akash on 4/4/16.
 */

/**
 * Created by akash on 3/24/16.
 */


module.exports = function (app,contentModel) {

    var api = {
        getCategoryData: getCategoryData
    };

    return api;

    function getCategoryData(category,counter){

        category_data = contentModel.getCategoryData(category);
        content =[]
        var limit = parseInt(counter) + 6;
        for( var i=counter; i < limit ; i++) {
            console.log(i);
            content.push(category_data[i]);
        }

        return content;
    }

}
