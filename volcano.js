class Volcano extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y);
        this.scene = config.scene;
        this.world = config.world;
        this.counter = 0;
        this.eruptRate = config.eruptRate;
        this.lavaShape = config.lavaShape;
        this.setStatic(true);
        this.setSensor(true);
        this.scene.actors.push(this);
    }

    update() {
        this.counter++;
        if (this.counter >= this.eruptRate) {
            this.erupt();
            this.counter = 0;
        }
    }

    erupt() {
        let lava = new Lava({
            scene: this.scene,
            world: this.world,
            x: this.x,
            y: this.y,
            element: 'lava',
            shapeObject: { "shape": this.lavaShape }
        });

        let xForce = Phaser.Math.FloatBetween(-0.3, 0.3);
        let yForce = Phaser.Math.FloatBetween(-0.1, -1);

        lava.applyForce({x: xForce, y: yForce});
    }
}
