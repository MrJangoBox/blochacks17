/**
 * Created by od on 2017-01-22.
 */

var welcomeEmail = require('./manageWelcomeEmail');
var request = require('request');

module.exports = function (server, cloudant) {

    server.post("/api/v1/posts/data/newpost", function (req, res, next) {

        var post = req.params;

        // Specify the database we are going to use (alice)...
        var db = cloudant.db.use('');

        db.insert(post, function(err, body, header) {
            if (err) {
                return console.log('[posts.insert] ', err.message);
            }

            console.log('You have inserted a new post.');
            
            res.end(JSON.stringify(body));
            
            request.post('URLHere', {form:{type:0, user: body.id}});
        });
        
        welcomeEmail.sendWelcome(post, function () {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(post));
        });
        
        return next();
    });
}