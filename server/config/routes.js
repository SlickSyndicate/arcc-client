const routes = {
    'HEAD /hello/:name': 'HelloController.respond',
    'GET /hello/:name': 'HelloController.respond',
    'GET /users/current': 'users.current',
    'GET /instance': 'instances.requestGeo'
};

module.exports = (app) => {
    const _ = require('lodash');
    _.each(routes, (value, key) => {
        let method = key.split(' ')[0].toLowerCase();
        let path = key.split(' ')[1];
        let controller = require(__dirname + '/../controllers/' + value.split('.')[0]);
        let func = controller[value.split('.')[1]];

        app[method](path, func);
    });
};

