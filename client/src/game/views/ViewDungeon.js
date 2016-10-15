export class ViewDungeon {
    game;
    container;

    constructor(game, dungeonMetadata) {
        // console.log("Dungeon metadata:", dungeonMetadata)
        this.game = game;
        this.game.world.setBounds(0, 0, dungeonMetadata.width, dungeonMetadata.height);

        this.container = this.game.add.spriteBatch(null, "Ground");
        this.container.visible = false;

        let viewportX = 50;
        let viewportY = 50;

        let start = new Date().getTime();
        for (let x = 0; x < viewportX; x++) {
            let row = dungeonMetadata.tiles[x];
            for (let y = 0; y < viewportY; y++) {
                let currentTile = row[y];
                switch (currentTile) {
                    case 0:
                        this.game.add.image(x * 8, y * 8, "tile_grey", this.container);
                        break;
                    case 1:
                        this.game.add.image(x * 8, y * 8, "tile_brown", this.container);
                        break;
                    default:
                        console.error("Invalid tile:", currentTile);
                }
            }
        }
        console.log("Completed ground rendering in " + (new Date().getTime() - start) + "ms")
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
