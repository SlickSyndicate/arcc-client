const port = (process.env.PORT || 3000);
const env = process.env.NODE_ENV || 'dev';

const path = require('path');
const express = require('express');
const app = express();

require('./config/middleware')(app);
require('./config/passport')(app);
require('./config/routes')(app);

if (env !== 'dev') {
    app.use((req, res, next) => {
        res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
    });
}

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});