import {SimpleGame} from "../Game";
import {SocketHelper} from "../SocketHelper";
import {ViewDungeon} from "./ViewDungeon";
import {ViewOptions} from "./ViewOptions";
export class ViewMainMenu {
    game;
    container;
    button;
    start_button;
    options_button;
    fullscreen_button;
    exit_button;
    music_button;
    layer;
    menu_text;

    isFullscreen = false;

    constructor(game) {
        var height = game.width;
        var height = game.height;

        this.game = game;
        this.container = game.add.group();

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.start_button = game.add.button(game.world.centerX , game.world.centerY - 150,'ui',this.startCallback, this, 'up', 'up', 'up', 'down')
        this.options_button = game.add.button(game.world.centerX ,game.world.centerY - 100,'ui',this.optionsCallback, this, 'up', 'up', 'up', 'down')
        this.exit_button = game.add.button(game.world.centerX ,game.world.centerY - 50,'ui',this.exitCallback, this, 'up', 'up', 'up', 'down')

        this.fullscreen_button = game.add.button(1,0,'ui',this.fullscreenCallback, this, 'up', 'up', 'up', 'down')
        this.music_button = game.add.button(0,0,'ui',this.musicCallback, this, 'up', 'up', 'up', 'down')
        
        this.start_button.x -= this.start_button.width/2
        this.options_button.x -= this.options_button.width/2
        this.exit_button.x -= this.exit_button.width/2


        var full_w_Temp = game.width - this.fullscreen_button.width;
        var full_h_Temp = game.height - this.fullscreen_button.height;
        this.music_button.x = full_w_Temp - this.fullscreen_button.width;
        this.fullscreen_button.x = full_w_Temp;

        this.game.add.sprite(50, 50, 'lofi_char_clipped', 9);
        this.game.add.sprite(50, 70, 'lofi_environment', 1);


       // this.start_button.anchor.setTo(0.5, 0.5);

        this.container.add(this.fullscreen_button);
        this.container.add(this.start_button);
        this.container.add(this.options_button)
        this.container.add(this.exit_button);
        this.container.add(this.music_button);

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

    startCallback() {
        this.start_button.inputEnabled = false;
        SocketHelper.connectToInstance("localhost:3000", (socket) => {
            socket.on("dungeonInfo", (info) => {
                SimpleGame.setView(new ViewDungeon(this.game, info));
            })
        });
        this.start_button.inputEnabled = true;
    }

    optionsCallback(){
        this.options_button.inputEnabled = false;
        SimpleGame.setView(new ViewOptions(this.game));
        this.options_button.inputEnabled = true;
    }

    exitCallback(){
        this.exit_button.inputEnabled = false;
        
        this.exit_button.inputEnabled = true;
    }

    fullscreenCallback() {
        this.fullscreen_button.inputEnabled = false;

        if (!document.fullscreenElement) {
            document.getElementById("canvasContainer").webkitRequestFullScreen();
        } else {
            console.log("exiting")
            document.webkitExitFullscreen();
        }

        this.fullscreen_button.inputEnabled = true;
        this.isFullscreen = !this.isFullscreen;
    }

    musicCallback(){
        this.music_button.inputEnabled = false;
        SocketHelper.connectToInstance("localhost:3000", (socket) => {
            socket.on("dungeonInfo", (info) => {
                SimpleGame.setView(new ViewDungeon(this.game, info));
            })
        });
        this.music_button.inputEnabled = true;
    }
}
