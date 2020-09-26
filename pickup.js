class Pickup extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.element, "", config.shapeObject, config.quantity);
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.setDepth(2);
        this.setName("pickup");
        this.setStatic(true);
        this.setSensor(true);
        this.type = config.element;
        this.quantity = config.quantity;
        if (this.type == "diamondPickup") {
            this.play("diamondAnim");
            this.setDepth(0);
            this.sparkle = this.scene.add.sprite(this.x, this.y, 'sparkle');
            this.sparkle.setDepth(2);
            this.sparkle.play('sparkleAnim');
        }

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {

                if (eventData.gameObjectB != null) {

                    if (eventData.gameObjectB.name == "lander") {

                        let lander = eventData.gameObjectB;
                        let found = false;
                        lander.score += 10;
                        switch(this.type) {

                            case "bombPickup":
                                lander.itemsPickedUp++;
                                for (let i = 0; i < lander.bombTypes.length; i++) {
                                    if (lander.bombTypes[i].type == "smallBomb") {
                                        lander.bombTypes[i].quantity += this.quantity;
                                        found = true;
                                        break;
                                    }
                                }

                                if (!found) {
                                    lander.addBombType("smallBomb", this.quantity);
                                }

                                break;

                            case "mediumBombPickup":
                                lander.itemsPickedUp++;
                                for (let i = 0; i < lander.bombTypes.length; i++) {
                                    if (lander.bombTypes[i].type == "mediumBomb") {
                                        lander.bombTypes[i].quantity += this.quantity;
                                        found = true;
                                        break;
                                    }
                                }

                                if (!found) {
                                    lander.addBombType("mediumBomb", this.quantity);
                                }
                                break;

                            case "largeBombPickup":
                                lander.itemsPickedUp++;
                                for (let i = 0; i < lander.bombTypes.length; i++) {
                                    if (lander.bombTypes[i].type == "largeBomb") {
                                        lander.bombTypes[i].quantity += this.quantity;
                                        found = true;
                                        break;
                                    }
                                }

                                if (!found) {
                                    lander.addBombType("largeBomb", this.quantity);
                                }
                                break;

                            case "clusterBombPickup":
                                lander.itemsPickedUp++;
                                for (let i = 0; i < lander.bombTypes.length; i++) {
                                    if (lander.bombTypes[i].type == "clusterBomb") {
                                        lander.bombTypes[i].quantity += this.quantity;
                                        found = true;
                                        break;
                                    }
                                }

                                if (!found) {
                                    lander.addBombType("clusterBomb", this.quantity);
                                }
                                break;

                            case "fuelPickup":
                                lander.itemsPickedUp++;
                                lander.fuel += this.quantity;
                                if (lander.fuel > lander.maxFuel) {
                                    lander.fuel = lander.maxFuel;
                                }
                                break;

                            case "repairPickup":
                                lander.itemsPickedUp++;
                                lander.health += this.quantity;
                                if (lander.health > lander.maxHealth) {
                                    lander.health = lander.maxHealth;
                                }
                                break;

                            case "diamondPickup":
                                lander.diamonds += this.quantity;
                                lander.score += 90;
                                lander.diamondsPickedUp++;
                                this.sparkle.destroy();
                                break;
                        }

                        if (soundOn) {
                            this.scene.sndPickup.play();
                        }
                        this.destroy();

                    }


                }
            }
        });
    }
}
