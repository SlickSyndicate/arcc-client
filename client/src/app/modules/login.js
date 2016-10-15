let view = (controller) => {
    return m(".inner.cover", [
        m("a", {href: "http://localhost:3000/auth/google"}, m("img", {src: require("img/login/btn_google_signin_light_normal_web.png")}))
    ]);
};

module.exports = {
    controller: () => {
        ARCC.activeTab = "login";
    },
    view: view
};