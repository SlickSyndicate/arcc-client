let view = (controller) => {
    let tabs = [
        m("a.nav-link.active", {href: "/", config: m.route}, "Home"),
        m("a.nav-link", {href: "/about", config: m.route}, "About"),
        m("a.nav-link", {href: "/contact", config: m.route}, "Contact"),
    ];

    if (ARCC.user) {
        tabs.push(m("a.nav-link", {href: "/dashboard", config: m.route}, "Dashboard"))
    } else {
        tabs.push(m("a.nav-link", {href: "/login", config: m.route}, "Login"));
    }

    return m(".masthead.clearfix", m(".inner", [
        m("h1.masthead-brand", "Arcadian Conquest"),
        m("nav.nav.nav-masthead", tabs)
    ]));
};

module.exports = {
    controller: () => {},
    view: view
};