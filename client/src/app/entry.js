//TODO Temporary hack to get icons to load properly
require("fonts/font-awesome/fontawesome-webfont.eot");
require("fonts/font-awesome/fontawesome-webfont.svg");
require("fonts/font-awesome/fontawesome-webfont.ttf");
require("fonts/font-awesome/fontawesome-webfont.woff");
require("fonts/font-awesome/fontawesome-webfont.woff2");

require("fonts/arcc/hinted-EnchantedLand.eot");
require("fonts/arcc/hinted-EnchantedLand.ttf");
require("fonts/arcc/hinted-EnchantedLand.woff");

require('styles/stylesheet.scss');
require('styles/bootstrap.css');
require('styles/main.scss');
require('styles/font-awesome.scss');
// require('bootstrap');

// Special variables
global.mm = {
/*
 endpoint: __API_ENDPOINT__,
    authToken: localStorage.getItem("authToken") || sessionStorage.getItem("authToken") || '',
    user: null,
    fetchUser: (cb) => {
        let authCookie = Cookie.get("authToken");
        if (authCookie !== null) {
            console.log("Got auth cookie:", authCookie);
            mm.authToken = authCookie;
            localStorage.setItem("authToken", authCookie);
            sessionStorage.setItem("authToken", authCookie);
            Cookie.set("authToken", "EMPTY", {expires: new Date(0).toGMTString()})
        }

        if (mm.authToken <= 0) return cb();

        m.request({
            method: 'GET',
            url: mm.endpoint + '/users/current',
            background: true
        }).then((response) => {
            // Invalid auth token
            if (!response) {
                mm.authToken = '';
                mm.user = null;
                localStorage.removeItem('authToken');
                sessionStorage.removeItem('authToken');
            } else {
                mm.user = response;
            }
            if (cb) cb();
        });
    },
    openTOS: () => {
        bootbox.dialog({
            title: "Terms of Service",
            message: "This is the TOS. Fear it.",
            buttons: {
                close: {
                    label: "Close",
                    className: "btn-primary"
                }
            }
        });
    },
    Header: require("./partials/header")
    */
};

global.util = {
    prop: function (store, onchange) {
        var prop = function () {
            if (arguments.length) {
                store = arguments[0];
                if (typeof onchange == 'function') {
                    onchange(store);
                }
            }
            return store;
        };
        prop.prototype.toJSON = function () {
            return store;
        };
        return prop;
    }
};

global.models = {
};

// Override Mithril's request function
let requestsInProgress = [];
const oldRequest = m.request;
let dones = 0;
m.request = function (options) {
    if (!options.config) {
        options.config = function (xhr) {
            xhr.setRequestHeader("X-AUTH-TOKEN", mm.authToken);
            xhr.withCredentials = true;
        }
    }

    if (!options.extract) {
        options.extract = (xhr, xhrOptions) => {
            if (xhr.status === 401) {
                flash("error", "You must login to do that");
                m.route('/signin');
                return null;
            } else if (xhr.status === 403) {
                flash("error", "403 Forbidden");
                m.route('/dashboard');
                return null;
            } else if (xhr.responseText.length === 0) {
                return null;
            } else {
                // Catches Play! plaintext errors and turns them into JSON so Mithril won't break
                try {
                    JSON.parse(xhr.responseText);
                    return xhr.responseText;
                } catch (msg) {
                    return JSON.stringify({error: xhr.responseText})
                }
            }
        }
    }

    let index = requestsInProgress.push(0) - 1;
    return oldRequest(options).then((A) => {
        requestsInProgress[index] = 1;
        recalculateProgressBar();
        dones++;
        console.log(dones, "/", requestsInProgress.length);
        return A;
    })
};

function recalculateProgressBar() {
    let average = 0;
    let length = requestsInProgress.length;
    let $pageProgress = $("#pageProgress");

    if (length === 0) { // No requests, hide progress bar and return
        $pageProgress.parent().slideUp();
        return;
    } else {
        $pageProgress.parent().slideDown();
    }

    for (let a = 0; a < length; a++) {
        average += requestsInProgress[a];
    }
    average /= length;

    if (average === 1) { // All requests completed
        requestsInProgress = [];
        $pageProgress.css("width", "100%");
        $pageProgress.parent().slideUp();
    } else {
        $pageProgress.css("width", (average * 100) + "%");
    }
}

function configureRoutes() {
    // Load our Mithril partials
    const header = require('./partials/header.js');
    const footer = require('./partials/footer.js');

    // Mount the header and footer
    m.module(document.querySelector("header"), header);
    m.module(document.querySelector("footer"), footer);

    //module loader helper
    var asyncModule = function(name) {
        return {
            controller: function() {
                if (!mm.user) {
                    if (name.startsWith("dashboard") || name.startsWith("staff")) {
                        return m.route('/signin');
                    }
                } else {
                    if (name.startsWith("auth/signIn") || name.startsWith("auth/signUp")) {
                        return m.route('/dashboard');
                    }
                }
                m.startComputation();

                var pageBundle = require("bundle!./modules/" + name);
                pageBundle((module) => {
                    this.controller = new module.controller();
                    this.view = module.view;
                    this.onunload = this.controller.onunload;

                    m.endComputation()
                });
            },
            view: function(ctrl) {
                if (ctrl.view) {
                    return ctrl.view(ctrl.controller)
                }
            }
        }
    };

    // Setup the routing so our one page app is actually one page
    m.route.mode = "pathname";
    m.route(document.querySelector("main"), "/", {
        "/": asyncModule("home"),
        "/play": asyncModule("play"),
        "/about": asyncModule("about"),
        "/contact": asyncModule("contact")
    });
}
// mm.fetchUser(configureRoutes);
configureRoutes();