import SimpleGame from "../../game/game"

let view = (controller) => {
    return m("div", {id: "canvasContainer"});
};

module.exports = {
    view: view,
    controller: () => {
        console.log("REE");
        new SimpleGame();
    }
};