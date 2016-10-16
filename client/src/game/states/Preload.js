import {AbstractState} from "./AbstractState";
export class Preload extends AbstractState {
    preload() {
        this.game.load.image('logo', 'img/logo.png');
        this.game.load.atlas('ui', 'img/uipack_rpg_sheet.png', 'data/atlas_ui.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);

        this.game.load.image('tile_grey', 'img/grey.png');
        this.game.load.image('tile_brown', 'img/brown.png');

        this.game.load.spritesheet('lofi_char_clipped', '/img/oryx/lofi_char_clipped.png', 32, 32);
        this.game.load.spritesheet('lofi_environment', '/img/oryx/lofi_environment.png', 8, 8);
    }
    create() {
        this.game.state.start("MainMenu")
    }
}