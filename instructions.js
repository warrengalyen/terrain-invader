class Instructions extends Phaser.Scene {
    constructor() {
        super("instructions");
    }

    preload() {

    }

    create() {
        // this.cameras.main.setVisible(false);
        this.arrow = this.add.image(config.width / 2 - 160, config.height - 54, 'arrow');
        let fontScaler = 1;
        if (mobile.matches) {
            fontScaler = 0.7;
            this.arrow.setVisible(false);
        }

        if (mobile.matches) {
            this.add.bitmapText(config.width / 2 - 96, 32, "fontPressStart", "Instructions", 24 * fontScaler);
            this.add.bitmapText(16, 96 * fontScaler, "fontPressStart", "Descend through the danger-", 18 * fontScaler);
            this.add.bitmapText(16, 128 * fontScaler, "fontPressStart", "ous terrain of each planet", 18 * fontScaler);
            this.add.bitmapText(16, 160 * fontScaler, "fontPressStart", "to reach the landing pad at", 18 * fontScaler);
            this.add.bitmapText(16, 192 * fontScaler, "fontPressStart", "its core. Avoid or destroy", 18 * fontScaler);
            this.add.bitmapText(16, 224 * fontScaler, "fontPressStart", "the planet's defenders and", 18 * fontScaler);
            this.add.bitmapText(16, 256 * fontScaler, "fontPressStart", "plunder any valuable resou-", 18 * fontScaler);
            this.add.bitmapText(16, 288 * fontScaler, "fontPressStart", "rces you find along the way.", 18 * fontScaler);
            this.add.bitmapText(16, 320 * fontScaler, "fontPressStart", "Let nothing stand between", 18 * fontScaler);
            this.add.bitmapText(16, 352 * fontScaler, "fontPressStart", "you and conquest, not even", 18 * fontScaler);
            this.add.bitmapText(16, 384 * fontScaler, "fontPressStart", "the terrain itself!", 18 * fontScaler);

            this.add.bitmapText(config.width / 2 - 64, 312, "fontPressStart", "Controls", 24 * fontScaler);
            this.add.image(config.width / 2 - 112, 352, 'upButton').setScale(0.7);
            this.add.bitmapText(config.width / 2 - 56, 346, "fontPressStart", "Forward Thrust", 18 * fontScaler);
            this.add.image(config.width / 2 - 112, 400, 'leftButton').setScale(0.7);
            this.add.bitmapText(config.width / 2 - 56, 394, "fontPressStart", "Roll Left", 18 * fontScaler);
            this.add.image(config.width / 2 - 112, 448, 'rightButton').setScale(0.7);
            this.add.bitmapText(config.width / 2 - 56, 442, "fontPressStart", "Roll Right", 18 * fontScaler);
            this.add.image(config.width / 2 - 112, 496, 'downButton').setScale(0.7);
            this.add.bitmapText(config.width / 2 - 56, 490, "fontPressStart", "Drill Down", 18 * fontScaler);
            this.add.image(config.width / 2 - 112, 544, 'bombButton').setScale(0.7);
            this.add.bitmapText(config.width / 2 - 56, 538, "fontPressStart", "Drop Bomb", 18 * fontScaler);
            this.add.image(config.width / 2 - 112, 592, 'typeButton').setScale(0.7);
            this.add.bitmapText(config.width / 2 - 56, 586, "fontPressStart", "Cycle Bomb Types", 18 * fontScaler);
            this.add.image(config.width / 2 - 112, 640, 'pauseButton').setScale(0.7);
            this.add.bitmapText(config.width / 2 - 56, 634, "fontPressStart", "Pause", 18 * fontScaler);

        } else {
            this.add.bitmapText(config.width / 2 - 175, 32, "fontPressStart", "Instructions", 24 * fontScaler);
            this.add.bitmapText(64, 96, "fontPressStart", "Descend through the dangerous terrain of each planet to reach", 18 * fontScaler);
            this.add.bitmapText(64, 128, "fontPressStart", "the landing pad at its core. Avoid or destroy the planet's", 18 * fontScaler);
            this.add.bitmapText(64, 160, "fontPressStart", "defenders and plunder any valuable resources you find along", 18 * fontScaler);
            this.add.bitmapText(64, 192, "fontPressStart", "the way. Let nothing stand between you and conquest, not even", 18 * fontScaler);
            this.add.bitmapText(64, 224, "fontPressStart", "the terrain itself!", 18 * fontScaler);

            this.add.bitmapText(config.width / 2 - 125, 264, "fontPressStart", "Controls", 24 * fontScaler);

            this.add.image(config.width / 2 - 232, 320, 'cursorKeyUp');
            this.add.bitmapText(config.width / 2 - 200, 310, "fontPressStart", "or W - Forward Thrust", 18);

            this.add.image(config.width / 2 - 232, 352, 'cursorKeyLeft');
            this.add.bitmapText(config.width / 2 - 200, 342, "fontPressStart", "or A - Rotate Left", 18);

            this.add.image(config.width / 2 - 232, 384, 'cursorKeyRight');
            this.add.bitmapText(config.width / 2 - 200, 374, "fontPressStart", "or D - Rotate Right", 18);

            this.add.image(config.width / 2 - 232, 416, 'cursorKeyDown');
            this.add.bitmapText(config.width / 2 - 200, 406, "fontPressStart", "or S - Drill Down", 18);

            this.add.bitmapText(config.width / 2 - 200, 438, "fontPressStart", "   Q - Roll Left", 18);
            this.add.bitmapText(config.width / 2 - 200, 470, "fontPressStart", "   E - Roll Right", 18);

            this.add.bitmapText(config.width / 2 - 218, 502, "fontPressStart", "SPACE - Drop Bomb", 18);
            this.add.bitmapText(config.width / 2 - 218, 534, "fontPressStart", "  TAB - Cycle Bomb Types (Forward)", 18);
            this.add.bitmapText(config.width / 2 - 218, 566, "fontPressStart", "SHIFT - Cycle Bomb Types (Backward)", 18);
            this.add.bitmapText(config.width / 2 - 218, 598, "fontPressStart", "   F1 - Pause / Unpause", 18);
            this.add.bitmapText(config.width / 2 - 218, 630, "fontPressStart", "   F2 - Toggle Fullscreen", 18);
        }


        this.mainMenu = this.add.bitmapText(config.width / 2 - 100 * fontScaler, config.height - 48, "fontPressStart", "Main Menu", 24 * fontScaler);

        if (mobile.matches) {
            this.mainMenu.setInteractive();
            let self = this;

            this.mainMenu.on('pointerdown', function() {
                self.gotoNextScene();
            });
        }

        let cam = this.cameras.main;
        let self = this;

        this.events.on('transitioncomplete', function(fromScene){
            cam.setVisible(true);
            self.fromScene = fromScene
        });

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.f1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1);

        this.beep = this.sound.add('menuBeep');
        this.sndSelect = this.sound.add('menuSelect');

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.gotoNextScene();
        };

        if (Phaser.Input.Keyboard.JustDown(this.f1)) {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                // On stop full screen
            } else {
                this.scale.startFullscreen();
                // On start full screen
            }
        }
    }

    gotoNextScene() {
        if (soundOn) {
            this.sndSelect.play();
        }
        this.scene.stop();
        this.scene.start('titleScene');
    }

}
