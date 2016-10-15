const HelloController = {
    current: function (req, res, next) {
        res.send(req.user);
    }
};
module.exports = HelloController;