class Terrain extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.world, config.x, config.y, "terrainBlock");
        config.scene.add.existing(this);
        this.setStatic(true);
        this.setName("terrain");
    }


    buildTerrainSection(i, width, yy) {

        for (; i < width; i += this.terrainDetail) {

            let newTerrain = new Terrain({
                scene: this,
                world: this.matter.world,
                x: i,
                y: yy
            });


        }
    }

    createTerrain(startX, startY, width, height, upOrDown) {
        height *= upOrDown;
        let endX = startX + width;
        let endY = startY + height;
        if (upOrDown > 0) {  // build top down
            for (let j = startY; j < endY; j += this.terrainDetail) {
                this.buildTerrainSection(startX, endX, j);
            }
        } else {  // build bottom up
            for (let j = startY; j > endY; j -= this.terrainDetail) {
                this.buildTerrainSection(startX, endX, j);
            }
        }
    }

    createMountain(startX, height, topWidth, randomness) {

        let xx = startX;
        let yy = this.groundHeight - height;
        let width = topWidth;
        let buildHeight = height / this.terrainDetail;

        for (let i = 0; i < buildHeight; i++) {

            this.createTerrain(xx, yy, width, this.terrainDetail, 1);
            let variant;
            variant = Phaser.Math.Between(-randomness, randomness);
            xx -= (this.terrainDetail + variant)
            yy += this.terrainDetail;
            variant = Phaser.Math.Between(-randomness, randomness);
            width += ((this.terrainDetail * 2) + variant);

        }

    }

}