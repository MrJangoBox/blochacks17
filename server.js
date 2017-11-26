/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// Parse incoming request bodies
var bodyParser = require('body-parser')

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var db;

// Connect to the db
MongoClient.connect("mongodb://admin:pass321@ds121696.mlab.com:21696/blockhack2017", function(err, database) {
  db = database;

  db.collection('refugees', function(err, collection) {});
  if(!err) {
    console.log("We are connected");
  }
});

// create a new express server
var server = express();

// serve the files out of ./public as our main files
server.use(express.static(__dirname + '/public'));

// Body parser
server.use(bodyParser.json())

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

// Reuse database object in request handlers
server.get("/", function(req, res) {
  db.collection("refugees").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});

server.get("/api/v1/refugees", function(req, res) {
  db.collection("refugees").find({}).toArray(function(err, docs) {
    res.end(JSON.stringify(docs));
  });
});

server.post("/api/v1/refugee", function(req, res) {
  db.collection('refugees').insertOne({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    age: req.body.age,
    camp_id: req.body.camp_id
  }).then(function(result) {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(result));
  })
});

