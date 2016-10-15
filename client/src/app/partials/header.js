let view = (controller) => {
    return m(".masthead.clearfix", m(".inner", [
        m("h1.masthead-brand", "Arcadian Conquest"),
        m("nav.nav.nav-masthead", [
            m("a.nav-link.active", {href: "/", config: m.route}, "Home"),
            m("a.nav-link", "About"),
            m("a.nav-link", "Contact")
        ])
    ]));
};

module.exports = {
    controller: () => {},
    view: view
};