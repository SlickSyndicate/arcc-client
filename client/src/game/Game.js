import {ViewMainMenu} from "./views/ViewMainMenu";
export class SimpleGame {
    // private static currentView;
    // public game;

    constructor() {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        let isRipple = window["tinyHippos"] !== undefined;
        if (!isRipple) {
            screenWidth *= window.devicePixelRatio;
            screenHeight *= window.devicePixelRatio;
        }

        // Load phaser
        this.game = new Phaser.Game(screenWidth, screenHeight, Phaser.CANVAS, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    preload() {
        this.game.load.image('logo', 'img/logo.png');
        this.game.load.atlas('ui', 'img/uipack_rpg_sheet.png', 'data/atlas_ui.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);

        this.game.load.image('tile_grey', 'img/grey.png');
        this.game.load.image('tile_brown', 'img/brown.png');
    }

    create() {
        SimpleGame.currentView = new ViewMainMenu(this.game);
        SimpleGame.currentView.show();
    }

    update() {
        SimpleGame.currentView.update();
    }

    static setView(view) {
        SimpleGame.currentView.hide();
        SimpleGame.currentView = view;
        SimpleGame.currentView.show();
    }
}