/**
 * Created by od on 2017-05-18.
 */

 var postsValidation = require('../validations/allPostsValidation');

var request = require('request');

module.exports = function (server, cloudant) {

    server.get("/api/v1/posts/data/all_posts", function (req, res, next) {

        // Specify the database we are going to use (alice)...
        var db = cloudant.db.use('');

        // db.find({"selector":{"Male": false}}, function (err, data) {
        db.list({include_docs:true}, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });

            var responseData = postsValidation.validatePost(data);

            // console.log("Response data is " + JSON.stringify(responseData));
            
            res.end(JSON.stringify(responseData));
        });
        
        return next();
    });
}