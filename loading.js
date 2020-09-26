class Loading extends Phaser.Scene {
    constructor() {
        super("loading");
    }

    preload() {
        this.load.bitmapFont('fontPressStart', './assets/fonts/fontPressStart.png', './assets/fonts/fontPressStart.fnt');
        this.load.spritesheet('loading', './assets/loading-spritesheet.png', {
            frameWidth: 200,
            frameHeight: 100
        });
    }

    create() {
        this.anims.create({
            key: "loadingAnim",
            frames: this.anims.generateFrameNumbers("loading"),
            frameRate: 4,
            repeat: -1,
            hideOnComplete: false
        });
        this.add.bitmapText(config.width / 2 - 96, config.height / 2, "fontPressStart", "Loading...", 1);
        this.add.sprite(config.width / 2, config.height / 2, "loading").play('loadingAnim');
        this.scene.launch('preload');
    }

}
