
let view = (controller) => {
    return m(".mastfoot", m(".inner", [
        m("p", "Copyright Jesse Savary and Max Vandendriesschen 2016")
    ]));
};

module.exports = {
    controller: () => {},
    view: view
};