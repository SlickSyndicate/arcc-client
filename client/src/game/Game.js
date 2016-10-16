import {ViewMainMenu} from "./views/ViewMainMenu";
import {Boot} from "./states/Boot"
import {MainMenu} from "./states/MainMenu";
import {Preload} from "./states/Preload";
import {Options} from "./states/Options";
import {Dungeon} from "./states/Dungeon";
import {WorldMap} from "./states/WorldMap";
let currentView;
export class SimpleGame {
    game;

    constructor() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        let isRipple = window["tinyHippos"] !== undefined;
        if (!isRipple) {
            screenWidth *= window.devicePixelRatio;
            screenHeight *= window.devicePixelRatio;
        }
        let width = window.innerWidth * 0.8;
        // Load phaser
        this.game = new Phaser.Game(width, width / 16 * 9, Phaser.CANVAS, 'canvasContainer', );
        // {
            // preload: this.preload,
            // create: this.create,
            // update: this.update
        // }

        // Register our states
        this.game.state.add("Boot", new Boot());
        this.game.state.add("Preload", new Preload());
        this.game.state.add("MainMenu", new MainMenu());
        this.game.state.add("Options", new Options());
        this.game.state.add("WorldMap", new WorldMap());
        this.game.state.add("Dungeon", new Dungeon());
        this.game.state.start("Boot");

        window.addEventListener('resize', () => {
            let width = window.innerWidth * 0.8;
            this.game.scale.setGameSize(width, width / 16 * 9)
        }, false);
    }

    preload() {

    }

    create() {
        this.game.stage.backgroundColor = "#ffffff"
        currentView = new ViewMainMenu(this.game);
        currentView.show();
    }

    update() {
        currentView.update();
    }

    static setView(view) {
        currentView.hide();
        currentView = view;
        currentView.show();
    }
}