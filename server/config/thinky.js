const env = process.env.NODE_ENV || 'dev';
const rethinkUrl = process.env.RETHINK_URL || "admin:@localhost:28015";

let options = {
    user: rethinkUrl.split('@')[0].split(':')[0],
    password: rethinkUrl.split('@')[0].split(':')[1],
    host: rethinkUrl.split('@')[1].split(':')[0],
    port: rethinkUrl.split('@')[1].split(':')[1],
    db: env,
};

if (env !== 'dev') {
    const FS = require('fs');
    let caCert = FS.readFileSync(__dirname + "/../../compose.io.cacert.pem");
    options.ssl = {
        ca: caCert
    };
}

module.exports = require('thinky')(options);