let view = (controller) => {
    return m(".inner.cover", [
        m("h1.cover-heading", "About"),
        m("p.lead", "Frameworks, Libraries, and Platforms that power ARCC"),
        m(".row", [
           m("img.img-responsive.col-md-3", {src: "/img/web/gulp.png"}),
            m("img.img-responsive.col-lg-3", {src: "/img/web/cordova.png"}),
            m("img.img-responsive.col-lg-3", {src: "/img/web/mapzen.png"}),
            m("img.img-responsive.col-lg-3", {src: "/img/web/github.png"}),
            m("img.img-responsive.col-md-3", {src: "/img/web/passport.png"}),
            m("img.img-responsive.col-lg-3", {src: "/img/web/travisci.png"})
        ]),
        m(".row",[
            m("img.img-responsive.col-lg-3", {src: "/img/web/yarn.png"}),
            m("img.img-responsive.col-lg-3", {src: "/img/web/amazonwebservices.png"}),
            m("img.img-responsive.col-xl-3", {src: "/img/web/phaser_logo.png"}),
            m("img.img-responsive.col-lg-3", {src: "/img/web/maxcdn.png"}),
            m("img.img-responsive.col-lg-3", {src: "/img/web/nodejs.png"})
        ])
    ]);
};

module.exports = {
    controller: () => {
        ARCC.activeTab = "about";
    },
    view: view
};