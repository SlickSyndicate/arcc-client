let view = (controller) => {
    return m(".inner.cover", [
        m("h1.cover-heading", "About Arcadian Conquest"),
        m("p.lead", "Arcadian Conquest is a free to play game made for Hack Western."),
        m("p.lead", m("a.btn.btn-lg.btn-secondary", {href: "/play", config: m.route}, "Play Now"))
    ]);
};

module.exports = {
    controller: () => {},
    view: view
};