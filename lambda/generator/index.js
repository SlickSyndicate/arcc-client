exports.handler = (event, context, callback) => {
    var latitude = 0;
    var longitude = 0;

    if (event.latitude) latitude = event.latitude;
    if (event.longitude) latitude = event.longitude;

    callback(null, require('./generators').outdoor(latitude + ":" + longitude));
};