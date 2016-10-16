const thinky = require('../config/thinky');
const type = thinky.type;

let Dungeon = thinky.createModel("Dungeon", {
    id: type.string(),
    latitude: type.number(),
    longitude: type.number(),
    name: type.string(),
    terrain: type.array(),
    activeServer: {
        address: type.string(),
        uptime: type.number()
    }
});

module.exports = Dungeon;