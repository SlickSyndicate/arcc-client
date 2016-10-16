const Dungeon = require("../models/dungeon");
const RestClient = require('node-rest-client').Client;
const restClient = new RestClient();
const Heroku = require('heroku-client');
const heroku = new Heroku({token: process.env.HEROKU_API_TOKEN});
const instanceURL = "localhost:4000";

const HelloController = {
    requestGeo: function (req, res, next) {
        let latitude = parseInt(req.query.latitude);
        let longitude = parseInt(req.query.longitude);

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
                    let terrain = require('../generators').outdoor(latitude + ":" + longitude);
                    dungeon = {
                        latitude: latitude,
                        longitude: longitude,
                        name: "TODO",
                        terrain: terrain
                    };
                    new Dungeon(dungeon).save((err, result) => {
                        console.log("New dungeon saved:", result.id);
                        cb(result);
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