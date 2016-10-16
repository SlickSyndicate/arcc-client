const env = process.env.NODE_ENV || 'dev';

const express = require('express');
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const Passport = require('passport'); // simulate DELETE and PUT (express4)
const CORS = require('cors');

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
    app.use(cors({origin: true, credentials: true}));
    app.use(Passport.initialize());
    app.use(Passport.session());
};