export class ViewOptions {
    game;
    container;
    logo;
    button;
    
    constructor(game) {
        this.game = game;
        this.container = game.add.group();
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
}