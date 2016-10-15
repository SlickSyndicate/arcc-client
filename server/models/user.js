const thinky = require('../config/thinky');
const type = thinky.type;

let User = thinky.createModel("User", {
    id: type.string(),
    googleId: type.string()
});

module.exports = User;