class LavaTrail extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, config.element, 0);
        config.scene.add.existing(this);

        // this.setDepth(2);
        // this.setName("lava");
        // this.setSensor(true);
        // this.play("lavaAnim");
        this.layer = { name: 'lava'};
        config.scene.actors.push(this);
        this.lifespan = 0;
        this.setSensor(config.sensor);
        this.setStatic(config.sensor);

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
        if (this.lifespan > 200) {
            this.alpha -= 0.1;
        }

        if (this.alpha <= 0) {
            this.destroy();
        }

    }


}
