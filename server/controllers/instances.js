const env = process.env.NODE_ENV || 'dev';
const Dungeon = require("../models/dungeon");
const RestClient = require('node-rest-client').Client;
const restClient = new RestClient();
const Heroku = require('heroku-client');
const heroku = new Heroku({token: process.env.HEROKU_API_TOKEN});
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2', accessKeyId: "AKIAIBMU6WEBBWVJBBEA", secretAccessKey: "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"});
const Lambda = new AWS.Lambda();
let instanceURL = "localhost:4000";
if (env !== "dev") instanceURL = "arcc-instance-server.herokuapp.com";

const HelloController = {
    requestGeo: function (req, res, next) {
        let latitude = parseInt(req.query.latitude);
        let longitude = parseInt(req.query.longitude);
        // let latitude = req.query.latitude;
        // let longitude = req.query.longitude;
        if (!latitude || !longitude) {
            res.status(422);
            res.send({
                error: "You must specify both a latitude and a longitude when request a geo instance"
            })
        } else {
            let cb = (dungeon) => {
                if (dungeon.activeServer) {
                    console.log("Dungeon", dungeon.id, "has active server");
                    res.send({
                        address: dungeon.activeServer.address
                    });
                } else {
                    console.log("Telling instances to load our dungeon", dungeon.id);
                    //TODO short-circuit this in development
                    restClient.post("http://" + instanceURL + "/loaddungeon", {data: {dungeon: dungeon}, headers: { "Content-Type": "application/json" }}, (data, response) => {
                        res.send({
                            address: instanceURL + "/" + dungeon.id
                        })
                    }).on('error', function (err) {
                        console.log('something went wrong on the request', err.request.options);
                    });
                }
            };

            Dungeon.filter({latitude: latitude, longitude: longitude}).run((err, dungeons) => {
                let dungeon;
                if (dungeons.length === 0) {
                    console.log("Dungeon for", latitude, longitude, "does not exist, generating...");

                    let params = {
                        FunctionName: 'generator',
                        InvocationType: 'RequestResponse',
                        LogType: 'Tail',
                        Payload: JSON.stringify({latitude: latitude, longitude: longitude})
                    };
                    Lambda.invoke(params, (err, data) => {
                        if (err) return console.error(err);
                        let payload = JSON.parse(data.Payload);
                        dungeon = {
                            latitude: latitude,
                            longitude: longitude,
                            name: "TODO",
                            terrain: payload
                        };
                        new Dungeon(dungeon).save((err, result) => {
                            if (err) return console.error(err);
                            console.log("New dungeon saved:", result.id);
                            cb(result);
                        });
                    });
                } else {
                    dungeon = dungeons[0];
                    console.log("Found existing dungeon", dungeon.id);
                    cb(dungeon);
                }
            });

        }
    }
};
module.exports = HelloController;