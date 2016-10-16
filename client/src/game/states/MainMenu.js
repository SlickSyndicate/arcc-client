import {AbstractState} from "./AbstractState";
export class MainMenu extends AbstractState {
    create() {
        this.titleText = this.game.add.text(0, 60, "Arcadian Conquest", {"font": "bold 140pt Enchanted Land"});
        this.titleText.x = this.game.world.width / 2 - this.titleText.width / 2;

        this.connectButton = this.game.add.button(0, 300, 'ui', this.connectBtnCallback, this);
        this.connectButton.x = this.game.world.width / 2 - this.connectButton.width / 2;
        let connectText = this.game.add.text(this.connectButton.x + 30, 305, "Connect");
        connectText.x = this.connectButton.centerX - connectText.width / 2;
        connectText.y = this.connectButton.centerY - connectText.height / 2;

        this.optionsButton = this.game.add.button(0, 360, 'ui', this.optio, this);
        this.optionsButton.x = this.game.world.width / 2 - this.optionsButton.width / 2;

        let optionsText = this.game.add.text(0, 0, "Options");
        optionsText.x = this.optionsButton.centerX - optionsText.width / 2;
        optionsText.y = this.optionsButton.centerY - optionsText.height / 2;
    }

    connectBtnCallback() {
        this.game.state.start('Dungeon');
    }


    optionsBtnCallback(){
        this.game.state.start('Options');
    }

    fullscreenBtnCallback() {
        this.fullscreen_button.inputEnabled = false;

        if (!document.fullscreenElement) {
            document.getElementById("canvasContainer").webkitRequestFullScreen();
        } else {
            document.webkitExitFullscreen();
        }

        this.fullscreen_button.inputEnabled = true;
        this.isFullscreen = !this.isFullscreen;
    }

    muteBtnCallback() {

    }
}