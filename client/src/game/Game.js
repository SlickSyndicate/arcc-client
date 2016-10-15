import {ViewMainMenu} from "./views/ViewMainMenu";
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
        var width = window.innerWidth * 0.8;
        // Load phaser
        this.game = new Phaser.Game(width, width / 16 * 9, Phaser.CANVAS, 'canvasContainer', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
        window.addEventListener('resize', () => {
            var width = window.innerWidth * 0.8;
            this.game.scale.setGameSize(width, width / 16 * 9)
        }, false);
    }

    preload() {
        this.game.load.image('logo', 'img/logo.png');
        this.game.load.atlas('ui', 'img/uipack_rpg_sheet.png', 'data/atlas_ui.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        //this.game.load.atlas('ui', 'img/oryx/lofi_char.png', 'json/lofi_char.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        //this.game.load.atlasJSONHash('char',  'img/oryx/lofi_char.png','json/lofi_char.json');

        this.game.load.image('tile_grey', 'img/grey.png');
        this.game.load.image('tile_brown', 'img/brown.png');

        this.game.load.spritesheet('lofi_char_clipped', '/img/oryx/lofi_char_clipped.png', 32, 32);
        this.game.load.spritesheet('lofi_environment', '/img/oryx/lofi_environment.png', 8, 8);

        // this.game.load.tilemap('lofi_char', '/json/lofi_char.json',null, Phaser.Tilemap.TILED_JSON);
        // this.game.load.image('lofi_char_img', '/img/oryx/lofi_char.png');
    }

    create() {
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