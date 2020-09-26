class WormBody extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.element, "");
        this.world = config.world;
        this.scene = config.scene;
        this.scene.add.existing(this);

        this.setStatic(true);
        // this.setSensor(true);
        this.setDepth(2);

        this.damage = 1;

        // this.scene.enemies.push(this);

        config.scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: eventData => {
                // const { bodyB, gameObjectB } = eventData;
                if (eventData.gameObjectB != null) {

                    if (eventData.gameObjectB.hasOwnProperty("health")) {
                        let obj = eventData.gameObjectB;
                        obj.takeDamage(this.damage);
                    }


                }
            }
        });


    }

}
