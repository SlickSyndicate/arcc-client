const env = process.env.NODE_ENV || 'dev';

const express = require('express');
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const Passport = require('passport'); // simulate DELETE and PUT (express4)

module.exports = (app) => {
    app.use(morgan("dev"));                                           // log every request to the console

    if (env !== 'dev') {
        app.use(express.static(__dirname + '/../../client/dist'));      // set the static files location /public/img will be /img for users
    }

    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(require('express-session')({secret: "REE"})); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(Passport.initialize());
    app.use(Passport.session());

        app.use(function(req, res, next) {
            if (env === "dev") {
                res.header("Access-Control-Allow-Origin", "http://localhost:9002");
            } else {
                res.header("Access-Control-Allow-Origin", "https://arcc.rocks, https://www.arcc.rocks, https://api.arcc.rocks, https://cdn.arcc.rocks");
            }
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
};