import {SimpleGame} from "../Game";
import {SocketHelper} from "../SocketHelper";
import {ViewDungeon} from "./ViewDungeon";
export class ViewMainMenu {
    game;
    container;
    logo;
    button;

    constructor(game) {
        this.game = game;
        this.container = game.add.group();

        this.logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        // this.logo.anchor.setTo(0.5, 0.1);
        this.container.add(this.logo);

        this.button = game.add.button(game.world.centerX, game.world.centerY, 'ui', this.buttonCallback, this, 'up', 'up', 'up', 'down');
        this.button.anchor.setTo(0.5, 0.5);
        this.container.add(this.button);

        this.container.visible = false;
    }

    show() {
        this.container.visible = true;
    }

    hide() {
        this.container.visible = false;
    }

    update() {
    }

    buttonCallback() {
        // For some reason we need to disable the button input, this prevents it from firing twice
        this.button.inputEnabled = false;
        SocketHelper.connectToInstance("localhost:3000", (socket) => {
            socket.on("dungeonInfo", (info) => {
                SimpleGame.setView(new ViewDungeon(this.game, info));
            })
        });
        this.button.inputEnabled = true;
    }
}