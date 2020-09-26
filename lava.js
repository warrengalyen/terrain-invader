class Lava extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.element, 0, config.shapeObject);
        config.scene.add.existing(this);

        this.play("lavaAnim");
        this.layer = { name: 'lava'};
        config.scene.actors.push(this);
        this.lifespan = 0;
        this.setMass(25);


        // config.scene.matterCollision.addOnCollideActive({
        //     objectA: this,
        //     callback: eventData => {
        //         // const { bodyB, gameObjectB } = eventData;
        //         if (eventData.gameObjectB != null) {

        //             if (eventData.gameObjectB.name == "lander") {
        //                 eventData.gameObjectB.takeDamage(1);
        //             }


        //         }
        //     }
        //   });

    }

    update() {
        this.lifespan++;
        if (this.lifespan > 1000) {
            this.alpha -= 0.1;
        }

        if (this.alpha <= 0) {
            this.destroy();
        }

    }


}
