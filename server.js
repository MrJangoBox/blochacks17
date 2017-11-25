/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
// var express = require('express');
var restify     =   require('restify');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// Load the Cloudant library.
var Cloudant = require('cloudant');

// Off platform connection
var cloudant = Cloudant("https://Username:username2@address.cloudant.com");

// create a new express server
// var app = express();
var server      =   restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// serve the files out of ./public as our main files
// app.use(express.static(__dirname + '/public'));

// CORS
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
server.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// Js files to db collections links
var manageNewAmbassador = require('./public/manageAmbassadors/manageNewAmbassador')(server, cloudant);
var manageNewPost = require('./public/managePosts/manageNewPost')(server, cloudant);
var getPosts = require('./public/managePosts/getPosts')(server, cloudant);
// var manageNewPost = require('./public/manageEmails/manageWelcomeEmail')(server, cloudant);