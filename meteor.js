class Meteor extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, "meteors", config.meteor, config.shapeObject);
        config.scene.add.existing(this);
        this.scene = config.scene;

        this.setDepth(2);
        // this.setScale(2);
        this.fireBall = this.scene.add.sprite(this.x, this.y, 'fireBall');
        this.fireBall.setDisplaySize(this.displayWidth * 3, this.displayHeight * 3);
        this.fireBall.play('fireBallAnim');

        this.scene.actors.push(this);

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {
                    if (eventData.gameObjectB.layer != null) {
                        if (eventData.gameObjectB.layer.name == "terrain") {
                            this.destroyTile(eventData.gameObjectB);
                        }
                    }

                    if (eventData.gameObjectB.hasOwnProperty("health")) {
                        let damage = this.body.speed * this.body.mass;
                        eventData.gameObjectB.takeDamage(damage);
                    }

                    this.explode();

                }
            }
        });
    }

    explode() {
        // this.setTexture("explosion");
        this.play("explodeAnim");
        let self = this;
        setTimeout(function () {
            removeFromArray(self, self.scene.actors);
            self.fireBall.destroy();
            self.destroy();
        }, 500);
    }

    destroyTile(tile) {
        this.setScale(3);
        let layer = tile.tilemapLayer;
        layer.removeTileAt(tile.x, tile.y);
        tile.physics.matterBody.destroy();
    }

    update() {
        if (typeof this.fireBall !== undefined) {
            this.fireBall.x = this.x;
            this.fireBall.y = this.y;
            this.fireBall.rotation = this.rotation;
        }
    }

}
