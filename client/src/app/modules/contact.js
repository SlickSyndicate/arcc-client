let view = (controller) => {
    return m(".inner.cover", [
        m("h1.cover-heading", "Contact Us!"),
        m("p.lead", "Please Email:"),
        m("p.follow","contact@arcc.rocks"),
        m("p.end", "For questions, concerns and bug reports!")
    ]);
};

module.exports = {
    controller: () => {
        ARCC.activeTab = "contact";
    },
    view: view
};