import {AbstractState} from "./AbstractState";
import {APIHandler as APIHelper} from "../APIHandler";
import {SocketHelper} from "../SocketHelper";
export class Dungeon extends AbstractState {
    player;
    keys;
    socket;

    terrain;
    entities;
    entityGroup;
    bullets;

    create() {
        this.entities = {};
        this.entityGroup = this.game.add.physicsGroup(Phaser.Physics.ARCADE);

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.keys = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            space: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACE),
            shift: this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
        };
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.SPACE, Phaser.Keyboard.SHIFT]);

        navigator.geolocation.getCurrentPosition((position) => {
            APIHelper.requestGeoInstance(position.coords.latitude, position.coords.longitude, (response) => {
                SocketHelper.connectToInstance(response.address, (socket) => {
                    this.socket = socket;
                    this.registerSocketHandlers(socket);
                    socket.emit("dungeon_join", {});
                });
            });
        });
    }

    update() {
        let moveData = {directions: []};
        if (this.keys.up.isDown) moveData.directions[0] = 1;
        if (this.keys.down.isDown) moveData.directions[1] = 1;
        if (this.keys.left.isDown) moveData.directions[2] = 1;
        if (this.keys.right.isDown) moveData.directions[3] = 1;
        if (this.keys.shift.isDown) moveData.sprinting = true;
        if (moveData.directions.length > 0) this.socket.emit("player_move", moveData);

        this.game.physics.arcade.collide(this.entityGroup);
        this.game.world.bringToTop(this.entityGroup)

        this.game.world.bringToTop(this.bullets);
    }

    render() {
        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // if (this.player) {
        //     this.game.debug.spriteCoords(this.player, 32, 500);
        // }
    }

    makeDungeon() {
        this.container = this.game.add.spriteBatch(null, "Ground");
        // this.container.visible = false;

        let viewportX = 100;
        let viewportY = 100;

        let start = new Date().getTime();
        for (let x = 0; x < viewportX; x++) {
            let row = this.terrain[x];
            for (let y = 0; y < viewportY; y++) {
                let currentTile = row[y];
                let img;
                switch (currentTile) {
                    case 0:
                        img = this.game.add.sprite(x * 32, y * 32, "lofi_environment", 114, this.container);
                        break;
                    case 1:
                        img = this.game.add.sprite(x * 32, y * 32, "lofi_environment", 70, this.container);
                        break;
                    default:
                        console.error("Invalid tile:", currentTile);
                }
                img.autoCull = true;
            }
        }
        console.log("Completed ground rendering in " + (new Date().getTime() - start) + "ms")
    }

    initializeEntities() {
        _.forOwn(this.entities, (value, key) => {
            // this.entities[key] = this.game.add.sprite(value.x, value.y, "lofi_char", value.character);
            this.entities[key] = this.entityGroup.create(value.x, value.y, "lofi_char", value.character);
        });
        this.entityGroup.setAll('body.collideWorldBounds', true);
    }

    registerSocketHandlers(socket) {
        socket.on("dungeon_info", (data) => {
            this.terrain = data.terrain;
            this.entities = data.entities;
            this.makeDungeon();
            this.initializeEntities();
            this.player = this.entities[data.playerId];
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            // this.game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400);
            this.game.world.setBounds(0, 0, 3200, 3200);
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.player.body.collideWorldBounds  = true;
            this.game.time.events.loop(1000, () => {
                socket.emit('player_sync', {
                    x: this.player.x,
                    y: this.player.y,
                    id: data.playerId
                })
            }, this);
            this.game.input.onDown.add(() => {
                console.log("Firing")
                socket.emit('player_fire', {
                    x: this.player.x,
                    y: this.player.y,
                    angle: this.game.physics.arcade.angleBetween(this.player, this.game.input)
                })
            }, this);
        });
        socket.on('entity_create', (data) => {
            console.log("Creating new entity with ID", data.id);
            this.entities[data.id] = this.entityGroup.create(data.x, data.y, "lofi_char", data.character);
        });
        socket.on('entity_destroy', (data) => {
            console.log("Deleting entity with ID", data.id);
            this.entities[data.id].destroy();
            delete this.entities[data.id];
        });
        socket.on('entity_move', (data) => {
            let entity = this.entities[data.id];
            entity.body.velocity.x = data.velocityX;
            entity.body.velocity.y = data.velocityY;

            entity.body.drag.x = 5200;
            entity.body.drag.y = 5200;
        });
        socket.on('entity_sync', (data) => {
            let entity = this.entities[data.id];
            entity.x = data.x;
            entity.y = data.y;
        });
        socket.on('bullet_create', (data) => {
            this.addBullet(data.x, data.y, data.angle)
        });
    }

    addBullet(x, y, angle) {
        let bullet = this.bullets.create(x, y, 'lofi_char', 155);
        this.game.physics.arcade.accelerationFromRotation(angle, 5000, bullet.body.acceleration);

        bullet.checkWorldBounds = true;
        bullet.body.maxVelocity = 10;
        bullet.events.onOutOfBounds.add(() => {
            bullet.kill()
        }, this);
    }
}