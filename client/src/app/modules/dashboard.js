let view = (controller) => {
    return m(".inner.cover", [
        m("h1.cover-heading", "Dashboard"),
    ]);
};

module.exports = {
    controller: () => {
        ARCC.activeTab = "dashboard";
    },
    view: view
};