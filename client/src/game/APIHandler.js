export class APIHandler {
    static authenticate(username, password) {
        console.log("Fake authentication");
        return "";
    }

    static requestGeoInstance(latitude, longitude, cb) {
        let queryString = m.route.buildQueryString({
            latitude: latitude,
            longitude: longitude
        });
        m.request({
            method: "GET",
            url: ARCC.endpoint + "/instance?" + queryString
        }).then((response) => {
            console.log("Geo instance response: " + response)
            cb(response)
        })
    }
}