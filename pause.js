class Pause extends Phaser.Scene {
    constructor() {
        super('pause');
    }

    init(data) {
        this.previousScene = data;
    }

    create() {
        this.add.bitmapText(config.width / 2 - 64, config.height / 2 - 20, "fontPressStart", "PAUSED", 28);
        if (mobile.matches) {
            this.unpauseButton = new Button ({
                scene: this,
                x: config.width / 2 + 16,
                y: config.height / 2 + 32,
                element: 'unpauseButton',
                type: 'unpause'
            });
        }
        // this.add.bitmapText(config.width / 2 - 160, config.height / 2, "fontPressStart", "Press F1 to Resume", 18);

        this.keys = this.input.keyboard.addKeys({"f1": Phaser.Input.Keyboard.KeyCodes.F1});
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.keys.f1)) {
            this.scene.resume(LEVELS[currentLevel]);
            this.previousScene.levelMusic.resume();
            this.scene.stop();
        }
    }
}
