class Lander extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, "lander", "", config.shapeObject);
        this.scene = config.scene;
        this.world = config.world;
        this.scene.add.existing(this);

        this.maxFuel = config.maxFuel;
        this.fuel = this.maxFuel;
        this.landerMass = config.mass;
        this.updateMass();

        this.thrust = config.thrust;
        this.setName("lander");
        this.setDepth(2);
        this.angle = -90;
        this.rotationRate = 0.01;

        this.maxHealth = config.maxHealth;
        this.health = this.maxHealth;

        this.thruster = this.scene.add.sprite(this.x, this.y, "engineThrust");
        this.thruster.play("thrustAnim");

        this.drill = this.scene.add.sprite(this.x, this.y, "drill").setDepth(3);
        this.drill.play('drillAnim');
        this.drilling = false;

        this.airBurstRight = this.scene.add.sprite(this.x + 16, this.y, 'airBurst');
        this.airBurstRight.play('airBurstAnim');
        this.airBurstRight.setVisible(false);

        this.airBurstLeft = this.scene.add.sprite(this.x - 16, this.y, 'airBurstLeft');
        this.airBurstLeft.play('airBurstLeftAnim');
        this.airBurstLeft.setVisible(false);


        this.diamonds = config.diamonds;

        this.bombTypes = [];

        this.score = config.score;

        this.enemiesKilled = 0;
        this.diamondsPickedUp = 0;
        this.bombsDropped = 0;
        this.itemsPickedUp = 0;
        this.terrainDestroyed = 0;
        this.healthLost = 0;
        this.fuelUsed = 0;


        for (let i = 0; i < config.bombs.length; i++) {
            this.addBombType(config.bombs[i].type, config.bombs[i].quantity);
        }

        this.currentBomb = 0;


        // this.on('collisionstart', this.landing, this);

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {
                    if (eventData.gameObjectB.name != 'pickup' && eventData.gameObjectB.type != 'explosive') {
                        this.landing(eventData.gameObjectB);
                    }

                    if (eventData.gameObjectB.name == "landingPad") {
                        // this.landing(eventData.gameObjectB);
                        let topLeft = eventData.gameObjectB.getTopLeft();
                        let topRight = eventData.gameObjectB.getTopRight();

                        if (this.x > topLeft.x && this.x < topRight.x && this.y < topLeft.y && this.rotation > -1.7 && this.rotation < -1.3 && this.health > 0) {
                            this.scene.levelOver = true;
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
                        if (eventData.gameObjectB.layer.name == "lava") {
                            this.takeDamage(0.5);
                        }

                        if (eventData.gameObjectB.layer.name == "terrain" && this.drilling) {
                            let tile = eventData.gameObjectB;

                            if (this.rotation < 0) {
                                this.destroyTile(tile);
                            }
                        }


                    }

                }
            }
        });
    }

    update() {

        this.updateMass();
        let pos = this.getLeftCenter();
        let bottomRight = this.getBottomRight();
        let topRight = this.getTopRight();
        this.thruster.x = pos.x;
        this.thruster.y = pos.y;
        this.thruster.rotation = this.rotation - Math.PI / 2;
        this.drill.x = pos.x;
        this.drill.y = pos.y;
        this.drill.rotation = this.rotation;
        this.airBurstLeft.x = topRight.x;
        this.airBurstLeft.y = topRight.y;
        this.airBurstLeft.rotation = this.rotation + Math.PI / 2;
        this.airBurstRight.x = bottomRight.x;
        this.airBurstRight.y = bottomRight.y;
        this.airBurstRight.rotation = this.rotation + Math.PI / 2;
    }

    updateMass() {
        this.totalMass = this.landerMass + (this.fuel / 10);
        this.setMass(this.totalMass);
    }

    landing(obj) {
        if (this.body.speed > 2.5) {
            let damage = this.body.speed * (this.body.mass / 10);
            this.takeDamage(damage);
            if (soundOn) {
                this.scene.sndHit.play();
            }

            if (obj.hasOwnProperty("health")) {
                obj.takeDamage(damage);
            }

            if (obj.layer != null && obj.layer.name == "terrain") {
                this.destroyTile(obj);
            }
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        this.healthLost += damage;
        if (this.health <= 0) {
            //blow up
            this.play("explodeAnim");
            if (soundOn) {
                this.scene.sndExplosion.play();
            }
            this.thruster.setVisible(false);
        };
    }

    destroyTile(tile) {
        this.terrainDestroyed++;
        let layer = tile.tilemapLayer;
        layer.removeTileAt(tile.x, tile.y);
        tile.physics.matterBody.destroy();
    }

    dropBomb() {
        this.bombsDropped++;
        let yy, element, shape, power;
        let currentBomb = this.bombTypes[this.currentBomb];
        if (currentBomb.quantity > 0) {
            switch (currentBomb.type) {

                case 'smallBomb':
                    yy = 32;
                    element = 'smallBomb';
                    shape = this.scene.bombShape["bomb"];
                    power = 250;
                    break;

                case 'mediumBomb':
                    yy = 48;
                    element = 'mediumBomb';
                    shape = this.scene.mediumBombShape['mediumBomb'];
                    power = 500;
                    break;

                case 'largeBomb':
                    yy = 64;
                    element = 'largeBomb';
                    shape = this.scene.largeBombShape['largeBomb'];
                    power = 1000;
                    break;

                case 'clusterBomb':
                    yy = 48;
                    element = 'clusterBomb';
                    shape = this.scene.mediumBombShape['mediumBomb'];
                    power = 250;
                    break;
            }

            let newBomb = new Explosive({
                scene: this.scene,
                world: this.world,
                x: this.x,
                y: this.y + yy,
                element: element,
                shapeObject: { "shape": shape },
                size: 6,
                damagePower: power
            });
            currentBomb.quantity--;

            if (currentBomb.quantity <= 0) {
                if (currentBomb.type != 'smallBomb') {
                    removeFromArray(currentBomb, this.bombTypes);
                    this.currentBomb--;
                } else {
                    this.currentBomb = this.bombTypes.length - 1;
                }
            }
        }
    }

    addBombType(type, quantity) {
        this.bombTypes.push({
            type: type,
            quantity: quantity
        });
    }


}
