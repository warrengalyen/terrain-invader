class Explosive extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.element, "", config.shapeObject, config.size);
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.world = config.world;
        this.element = config.element;
        this.setDepth(2);
        this.setName(config.element);
        this.setMass(100);
        this.size = config.size;
        this.damagePower = config.damagePower;
        this.alreadyHit = [];
        this.exploding = false;
        this.type = 'explosive';
        this.landerBomb = false;
        switch (this.element) {
            case 'smallBomb':
            case 'mediumBomb':
            case 'largeBomb':
            case 'clusterBomb':
                this.landerBomb = true;
                break;
        }

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {

                    if (eventData.gameObjectB.name != "pickup" && !this.exploding) {
                        this.exploding = true;
                        if (this.element == 'clusterBomb') {
                            this.explodeClusters();
                        } else {
                            this.explode();
                        }
                    }

                    if (eventData.gameObjectB.layer != null) {
                        if (eventData.gameObjectB.layer.name == "terrain") {
                            this.destroyTile(eventData.gameObjectB);
                        }
                    }

                    if (eventData.gameObjectB.hasOwnProperty("health")) {
                        let obj = eventData.gameObjectB;
                        let canHit = true;
                        for (let i = 0; i < this.alreadyHit.length; i++) {
                            if (this.alreadyHit[i] == obj) {
                                canHit = false;
                                break;
                            }
                        }

                        if (canHit) {
                            obj.takeDamage(this.damagePower, this.name);
                            this.alreadyHit.push(obj);
                        }
                    }


                }
            }
        });

    }

    explodeClusters() {

        this.size = 1.5;
        let self = this;

        let bomb1 = new Explosive({
            scene: this.scene,
            world: this.world,
            x: this.x + 16,
            y: this.y - 32,
            element: 'smallBomb',
            shapeObject: { "shape": this.scene.bombShape["bomb"] },
            size: 6,
            damagePower: 250
        });

        bomb1.applyForce({x: 1.5, y: -1});

        setTimeout(function() {
            let bomb2 = new Explosive({
                scene: self.scene,
                world: self.world,
                x: self.x + 32,
                y: self.y - 64,
                element: 'smallBomb',
                shapeObject: { "shape": self.scene.bombShape["bomb"] },
                size: 6,
                damagePower: 250
            });

            bomb2.applyForce({x: 1, y: -1});
        }, 50);

        setTimeout(function() {
            let bomb3 = new Explosive({
                scene: self.scene,
                world: self.world,
                x: self.x + 64,
                y: self.y - 128,
                element: 'smallBomb',
                shapeObject: { "shape": self.scene.bombShape["bomb"] },
                size: 6,
                damagePower: 250
            });

            bomb3.applyForce({x: 0.5, y: -1});
        }, 50);

        setTimeout(function() {
            let bomb4 = new Explosive({
                scene: self.scene,
                world: self.world,
                x: self.x - 64,
                y: self.y - 32,
                element: 'smallBomb',
                shapeObject: { "shape": self.scene.bombShape["bomb"] },
                size: 6,
                damagePower: 250
            });

            bomb4.applyForce({x: -1.5, y: -1});
        }, 50);

        setTimeout(function() {
            let bomb5 = new Explosive({
                scene: self.scene,
                world: self.world,
                x: self.x - 32,
                y: self.y - 64,
                element: 'smallBomb',
                shapeObject: { "shape": self.scene.bombShape["bomb"] },
                size: 6,
                damagePower: 250
            });

            bomb5.applyForce({x: -1, y: -1});
        }, 50);

        setTimeout(function() {
            let bomb6 = new Explosive({
                scene: self.scene,
                world: self.world,
                x: self.x - 16,
                y: self.y - 32,
                element: 'smallBomb',
                shapeObject: { "shape": self.scene.bombShape["bomb"] },
                size: 6,
                damagePower: 250
            });

            bomb6.applyForce({x: -0.5, y: -1});
        }, 50);


        this.explode();
    }

    explode() {
        this.setScale(this.size);
        let explosion = this.play("explodeAnim");
        explosion.setOrigin(0.5, 0.5);
        if (soundOn) {
            this.scene.sndExplosion.play();
        }
        let self = this;
        setTimeout(function () {
            self.destroy();
        }, 500);
    }

    destroyTile(tile) {
        if (this.landerBomb) {
            this.scene.lander.terrainDestroyed++;
        }
        let layer = tile.tilemapLayer;
        layer.removeTileAt(tile.x, tile.y);
        tile.physics.matterBody.destroy();
    }
}
