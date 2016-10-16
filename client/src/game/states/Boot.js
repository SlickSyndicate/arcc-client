import {AbstractState} from "./AbstractState";
export class Boot extends AbstractState {
    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.game.stage.backgroundColor = "#ffffff";
        this.game.stage.disableVisibilityChange = true;
        this.game.state.start("Preload");
    }
}