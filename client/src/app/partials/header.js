let tabHelper = (name) => {
    "use strict";
    if (ARCC.activeTab === name.toLowerCase()) return ".active";
    else return "";
};

let view = (controller) => {
    let tabs = [
        m("a.nav-link" + tabHelper("home"), {href: "/", config: m.route}, "Home"),
        m("a.nav-link" + tabHelper("about"), {href: "/about", config: m.route}, "About"),
        m("a.nav-link" + tabHelper("contact"), {href: "/contact", config: m.route}, "Contact"),
    ];

    if (ARCC.user) {
        tabs.push(m("a.nav-link" + tabHelper("dashboard"), {href: "/dashboard", config: m.route}, "Dashboard"))
    } else {
        tabs.push(m("a.nav-link" + tabHelper("login"), {href: "/login", config: m.route}, "Login"));
    }

    return m(".masthead.clearfix", m(".inner", [
        m("h1.masthead-brand", m("a", {config: m.route, href: "/"}, "Arcadian Conquest")),
        m("nav.nav.nav-masthead", tabs)
    ]));
};

module.exports = {
    controller: () => {},
    view: view
};