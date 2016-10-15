"use strict";
const env = process.env.NODE_ENV || 'dev';
let port = (process.env.PORT || 3000);

var path = require('path');
var express = require('express');
var app = express();

var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(morgan("dev"));                                           // log every request to the console

if (env !== 'dev') {
    app.use(express.static(__dirname + '/client/dist'));      // set the static files location /public/img will be /img for users
}

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//TODO API ROUTING LOGIC HERE

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'))
});


app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});