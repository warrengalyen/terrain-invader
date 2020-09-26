class Worm extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.element, "", config.shapeObject);
        this.world = config.world;
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.maxHealth = config.maxHealth;
        this.health = this.maxHealth;

        this.scoreValue = config.scoreValue;

        this.originalX = config.x;
        this.originalY = config.y;
        // this.bodyLength = 0;
        // this.lastSegment = 0;

        // this.bodySegments = [];
        this.direction = config.direction;

        this.damage = 50;

        this.setVisible(false);
        this.setStatic(true);
        this.setSensor(true);
        this.setDepth(3);

        this.scaling = 1;

        this.bodySegment = new WormBody({
            scene: this.scene,
            world: this.world,
            x: this.x,
            y: this.y,
            element: 'wormBody'
        });
        this.bodySegment.setVisible(false);
        this.bodySegment.setOrigin(0.5, 1);

        if (this.direction == 'down') {
            this.angle = 180;
        }


        this.scene.actors.push(this);

        // this.setMass(5000);

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {

                    if (eventData.gameObjectB.hasOwnProperty("health")) {
                        let obj = eventData.gameObjectB;
                        obj.takeDamage(this.damage);
                    }

                    if (eventData.gameObjectB.layer != null) {
                        // if (eventData.gameObjectB.layer.name == "terrain" || eventData.gameObjectB.layer.name == "stone") {
                        //     this.landing(eventData.gameObjectB);
                        // }
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


    findTarget() {
        let pX = this.scene.lander.x;
        let pY = this.scene.lander.y;
        if (pX > this.x - 160 && pX < this.x + 160 && pY > this.y - 160 && pY < this.y + 160) {
            return true;
        } else {
            return false;
        }

    }

    attack() {
        let pY = this.scene.lander.y;
        this.setVisible(true);
        this.bodySegment.setVisible(true);
        if (this.direction == 'up') {
            if (pY < this.y - 2 && this.y > this.originalY - 100) {
                this.rise();
            } else if (pY > this.y + 2) {
                if (this.y < this.originalY) {
                    this.lower();
                } else {
                    this.setVisible(false);
                    this.bodySegment.setVisible(false);
                }
            }
        } else {
            if (pY > this.y + 2 && this.y < this.originalY + 100) {
                this.lower();
            } else if (pY < this.y - 2) {
                if (this.y > this.originalY) {
                    this.rise();
                } else {
                    this.setVisible(false);
                    this.bodySegment.setVisible(false);
                }
            }
        }

    }

    rise() {
        this.y--;
        this.bodySegment.y -= 0.1;
        this.scaling += 0.06;
        this.bodySegment.scaleY = this.scaling;
        this.bodySegment.y += 0.2;
        // if (this.lastSegment >= 12) {
        //     // let newSegment = this.scene.add.sprite(this.x, this.y + this.lastSegment, 'wormBody');

        //     this.bodySegments.push(newSegment);
        //     this.lastSegment = 0;
        //     this.bodyLength++;
        // }
        // this.lastSegment++;
    }

    lower() {
        this.y++;
        this.bodySegment.y += 0.1;
        this.scaling -= 0.06;
        this.bodySegment.scaleY = this.scaling;
        this.bodySegment.y -= 0.2;
        // if (this.lastSegment >= 12) {
        //     if (this.bodySegments.length > 0) {
        //         this.bodySegments[this.bodySegments.length - 1].destroy();
        //         removeFromArray(this.bodySegments[this.bodyLength - 1], this.bodySegments);
        //         this.bodyLength--;
        //         this.lastSegment = 0;
        //     }
        // }
        // this.lastSegment++;
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
            this.die();
        };
    }

    die() {
        // this.play("explodeAnim");
        // let self = this;
        // setTimeout(function () {
        removeFromArray(this, this.scene.actors);
        this.bodySegment.destroy();
        this.destroy();
        // }, 350);
    }

    update() {
        // console.log(this.y + " " + this.scene.lander.y + " " + this.bodySegments.length);
        if (this.findTarget()) {
            this.attack();
        } else {
            if (this.direction == 'up') {
                if (this.y < this.originalY) {
                    this.lower();
                } else {
                    this.setVisible(false);
                    this.bodySegment.setVisible(false);
                }
            } else {
                if (this.y > this.originalY) {
                    this.rise();
                } else {
                    this.setVisible(false);
                    this.bodySegment.setVisible(false);
                }
            }
        }

    }
}
