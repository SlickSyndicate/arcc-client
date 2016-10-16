const HelloController = {
    requestGeo: function (req, res, next) {
        let latitude = req.query.latitude;
        let longitude = req.query.longitude;

        if (!latitude || !longitude) {
            res.status(422);
            res.send({
                error: "You must specify both a latitude and a longitude when request a geo instance"
            })
        } else {
            // Query Heroku for an available dyno
            // Spin up a new instance for this geographical location
            // Return the address of the dyno so the client can use socket.io with it
            res.send({
                address: "localhost:4000"
            })
        }
    }
};
module.exports = HelloController;