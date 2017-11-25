
/**
 * Created by od on 2017-07-16.
 */

module.exports.validatePost = function (data) {
    var validatedData = []; 

    for (var entry of data.rows) {
        if (Object.keys(entry.doc).length == 70) {
            // console.log("An entry: " + JSON.stringify(entry.doc) + "\n");
            validatedData.push(entry.doc);
       }
    }
    
    return validatedData;
};