class Turret extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, "turretBase", "", config.shapeObject);
        this.world = config.world;
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.barrel = this.scene.add.image(config.x, config.y, "turretBarrel");
        this.barrel.setDepth(3);
        this.scene.add.existing(this.barrel);

        this.reloadCounter = 0;
        this.reloadTime = config.reloadTime;

        this.fireX;
        this.fireY;
        this.canFire = true;
        this.firePower = config.firePower;
        this.mortarDamage = config.mortarDamage;
        this.sightX = 450;
        this.sightY = 450;
        if (mobile.matches) {
            this.sightX = 250;
            // this.sightY = 350;
        }

        this.maxHealth = config.maxHealth;
        this.health = this.maxHealth;

        this.scoreValue = config.scoreValue;

        this.scene.actors.push(this);

        this.setMass(50);

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {
                    if (eventData.gameObjectB.layer != null) {
                        if (eventData.gameObjectB.layer.name == "terrain" || eventData.gameObjectB.layer.name == "stone") {
                            this.landing(eventData.gameObjectB);
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
            this.canFire = true;
        } else {
            this.canFire = false;
        }

        let a, b, c, theta, firingAngle;

        if (this.x < pX) { // player is to the right
            a = pX - this.x;
            this.fireX = a / this.firePower;
        } else if (this.x > pX) { // player is to the left
            a = this.x - pX;
            this.fireX = -(a / this.firePower);
        }

        if (this.y > pY) { // player is above
            b = this.y - pY;
            this.fireY = -(b / this.firePower);
        } else if (this.y < pY) { // player is below
            b = pY - this.y;
            this.fireY = (b / this.firePower);
        }

        c = Math.sqrt((a * a) + (b * b));
        theta = Math.asin(b / c);

        if (pX > this.x && pY < this.y) { // player is up and right - quad 1
            firingAngle = -theta;
        } else if (pX > this.x && pY > this.y) { // player is down and right - quad 4
            firingAngle = theta;
        } else if (pX < this.x && pY < this.y) { // player is up and left - quad 2
            firingAngle = Math.PI + theta;
        } else if (pX < this.x && pY > this.y) { // player is down and left - quad 3
            firingAngle = Math.PI - theta;
        }


        this.barrel.rotation = firingAngle;
    }

    fire() {
        let vec = this.barrel.getRightCenter();

        let mortar = new Explosive({
            scene: this.scene,
            world: this.world,
            x: vec.x,
            y: vec.y,
            element: "mortar",
            shapeObject: {"shape": this.scene.mortarShape["mortarShape"]},
            size: 4,
            damagePower: this.mortarDamage
        });

        mortar.rotation = this.barrel.rotation;
        mortar.applyForce({x: this.fireX, y: this.fireY});
    }

    takeDamage(damage, name) {
        this.health -= damage;
        if (this.health <= 0) {
            switch (name) {
                case 'smallBomb':
                case 'mediumBomb':
                case 'largeBomb':
                    this.scene.lander.score += this.scoreValue;
                    this.scene.lander.enemiesKilled++;
                    break;
            }
            this.explode();
        }
        ;
    }

    explode() {
        this.play("explodeAnim");
        if (soundOn) {
            this.scene.sndExplosion.play();
        }
        let self = this;
        setTimeout(function () {
            removeFromArray(self, self.scene.actors);
            self.barrel.destroy();
            self.destroy();
        }, 350);
    }

    update() {
        this.barrel.x = this.x;
        this.barrel.y = this.y;
        this.findTarget();
        this.reloadCounter++;
        if (this.reloadCounter > this.reloadTime && this.canFire) {
            this.reloadCounter = 0;
            this.fire();
        }
    }
}
