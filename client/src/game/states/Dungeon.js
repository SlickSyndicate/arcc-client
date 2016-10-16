import {AbstractState} from "./AbstractState";
import {APIHandler as APIHelper} from "../APIHandler";
import {SocketHelper} from "../SocketHelper";
export class Dungeon extends AbstractState {
    makeDungeon(dungeonMetadata) {
        this.container = this.game.add.spriteBatch(null, "Ground");
        this.container.visible = false;

        let viewportX = 50;
        let viewportY = 50;

        let start = new Date().getTime();
        for (let x = 0; x < viewportX; x++) {
            let row = dungeonMetadata.terrain[x];
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

    create() {
        navigator.geolocation.getCurrentPosition((position) => {
            APIHelper.requestGeoInstance(position.coords.latitude, position.coords.longitude, (response) => {
                SocketHelper.connectToInstance(response.address, (socket) => {
                    console.log(position.coords);
                    socket.emit("join_dungeon", {
                        latitude:  position.coords.latitude,
                        longitude:  position.coords.longitude
                    });
                    socket.on("dungeon_info", (info) => {
                        this.makeDungeon(info);
                    })
                });
            });
        });
    }

}