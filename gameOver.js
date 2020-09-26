class gameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");

    }

    init(data) {
        this.playerInfo = data;
    }

    create() {

        this.musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.gameOverMusic = this.sound.add('gameOverMusic');

        this.cameras.main.setVisible(false);
        if (mobile.matches) {
            this.add.bitmapText(64, 128, "fontPressStart", "Invasion", 30);
            this.add.bitmapText(96, 192, "fontPressStart", "Failed", 30);
            this.tryAgain = this.add.bitmapText(16, config.height / 2, "fontPressStart", "Try Again", 36);
            this.tryAgain.setInteractive();
            let self = this;

            this.tryAgain.on('pointerdown', function() {
                self.restartLevel();
            });
        } else {
            this.add.bitmapText(config.width / 2 - 160, config.height / 2 - 50, "fontPressStart", "Invasion Failed", 24);
            this.add.bitmapText(config.width / 2 - 190, config.height / 2, "fontPressStart", "Press Enter to Try Again", 18);
        }

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        let cam = this.cameras.main;

        let self = this;
        this.fromScene;

        this.events.on('transitioncomplete', function(fromScene){
            cam.setVisible(true);
            self.fromScene = fromScene;
            if (musicOn) {
                self.gameOverMusic.play(self.musicConfig);
            }
        });

        this.events.on('transitionout', function() {
            self.gameOverMusic.stop();
        });

        this.sndSelect = this.sound.add('menuSelect');

    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.restartLevel();
        }
    }

    restartLevel() {
        if (soundOn) {
            this.sndSelect.play();
        }
        this.scene.stop(this.fromScene);
        this.scene.stop('gameOver');
        this.cameras.main.setVisible(false);
        this.scene.start(this.fromScene);
        this.scene.transition({
            target: this.fromScene,
            data: this.playerInfo,
            // moveAbove: false,
            moveBelow: true,

            duration: 0,

            // remove: true,
            sleep: true,
            allowInput: false,

            // onUpdate: null,
            // onUpdateScope: scene
        });
    }
};
