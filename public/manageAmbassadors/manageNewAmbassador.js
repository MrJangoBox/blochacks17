/**
 * Created by od on 2017-01-06.
 */

var welcomeEmail = require('./manageWelcomeEmail');
var request = require('request');

module.exports = function (server, cloudant) {

    server.post("/api/v1/ambassadors/data/newambassador", function (req, res, next) {

        var user = req.params;

        // Specify the database we are going to use (alice)...
        var db = cloudant.db.use('ambassadors');

        db.insert(user, function(err, body, header) {
            if (err) {
                console.debug('hello')
                return console.log('[ambassadors.insert] ', err.message);
            }

            console.log('You have inserted a new user.');

            res.end(JSON.stringify(body));
        
            request.post('https://URLHere', {form:{type:1, user: body.id}});
        });

        welcomeEmail.sendWelcome(user, function () {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(user));
        });

        return next();
    });
}