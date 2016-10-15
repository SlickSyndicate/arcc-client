import {SimpleGame} from "../../game/Game"

let view = (controller) => {
    return m("div", {id: "canvasContainer"});
};

module.exports = {
    view: view,
    controller: () => {
        ARCC.activeTab = "play";
        setTimeout(() => { new SimpleGame();}, 1100)
    }
};

