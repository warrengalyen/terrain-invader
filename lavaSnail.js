class LavaSnail extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.element, "", config.shapeObject);
        this.world = config.world;
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.maxHealth = config.maxHealth;
        this.health = this.maxHealth;

        this.counter = 0;
        this.dropTime = 10;

        this.sightX = 450;
        this.sightY = 450;
        if (mobile.matches) {
            this.sightX = 250;
            // this.sightY = 350;
        }

        this.scene.actors.push(this);

        this.layer = { name: 'lava'};

        this.scoreValue = config.scoreValue;

        this.setMass(50);

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {
                    if (eventData.gameObjectB.layer != null) {
                        if (eventData.gameObjectB.layer.name == "terrain" || eventData.gameObjectB.layer.name == "stone") {
                            // this.landing(eventData.gameObjectB);
                        }
                    }
                }
            }
        });

        config.scene.matterCollision.addOnCollideActive({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {
                    if (eventData.gameObjectB.layer != null) {
                        // if (eventData.gameObjectB.layer.name == "lava") {
                        //     this.takeDamage(0.5);
                        // }

                    }

                }
            }
        });

    }

    landing(obj) {
        if (this.body.speed > 2.5) {
            let damage = this.body.speed * (this.body.mass / 10);
            this.takeDamage(damage);
            if (obj.layer != null && obj.layer.name == "terrain") {
                this.destroyTile(obj);
            }
        }
    }

    destroyTile(tile) {
        let layer = tile.tilemapLayer;
        layer.removeTileAt(tile.x, tile.y);
        tile.physics.matterBody.destroy();
    }

    findTarget() {
        let pX = this.scene.lander.x;
        let pY = this.scene.lander.y;

        if (pX > this.x - this.sightX && pX < this.x + this.sightX && pY > this.y - this.sightY && pY < this.y + this.sightY) {
            return true;
        } else {
            return false;
        }

    }

    move() {
        this.counter++;
        let pX = this.scene.lander.x;
        let direction;

        if (pX > this.x) {
            this.flipX = false;
            this.applyForce({x: 0.02, y: 0});
            direction = -1;
        } else if (pX < this.x) {
            this.flipX = true;
            this.applyForce({x: -0.02, y: 0});
            direction = 1;
        }

        if (this.counter >= this.dropTime) {
            this.dropLava(direction);
            this.counter = 0;
        }


    }

    dropLava(direction) {
        let lavaTrail = new LavaTrail({
            scene: this.scene,
            world: this.world,
            x: this.x + (24 * direction),
            y: this.y + 8,
            element: 'lavaTrail',
            sensor: true
        });
    }

    takeDamage(damage, name) {
        this.health -= damage;
        if (this.health <= 0) {
            switch(name) {
                case 'smallBomb':
                case 'mediumBomb':
                case 'largeBomb':
                    this.scene.lander.score += this.scoreValue;
                    this.scene.lander.enemiesKilled++;
                    break;
            }
            this.explode();
        };
    }

    explode() {
        this.play("explodeAnim");
        let self = this;
        setTimeout(function () {
            removeFromArray(self, self.scene.actors);
            self.destroy();
        }, 350);
    }

    update() {
        this.rotation = 0;
        if (this.findTarget()) {
            this.move();
        };
        // this.reloadCounter++;
        // if (this.reloadCounter > this.reloadTime && this.canFire) {
        //     this.reloadCounter = 0;
        //     this.fire();
        // }
    }
}
