class TitleScene extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {

    }

    create() {
        // this.cameras.main.setVisible(false);

        this.musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };

        if (!this.musicPlaying && musicOn) {
            this.titleMusic = this.sound.add('titleMusic');
            this.titleMusic.play(this.musicConfig);
            this.musicPlaying = true;
        }

        let fontSize = 24;

        if (mobile.matches) {
            // this.scale.startFullscreen();
            this.titleImage = this.add.image(0, 0, 'titleBackground');
            this.titleImage.setOrigin(0, 0);

            this.add.image(config.width / 2, config.height / 2, 'landerWithFlame');

            this.add.bitmapText(config.width / 2 - 128, 112, 'fontPressStart', 'TERRAIN', 36);
            this.add.bitmapText(config.width / 2 - 160, 160, 'fontPressStart', 'INVADER', 46);

            fontSize = 20;
        } else {
            this.titleImage = this.add.image(0, 0, 'titleImage');
            this.titleImage.setOrigin(0, 0);
        }



        this.playGame = this.add.bitmapText(config.width / 2 - 96, config.height / 2 + 100, "fontPressStart", "Play Game", fontSize);
        this.options = this.add.bitmapText(config.width / 2 - 96, config.height / 2 + 148, "fontPressStart", "Options", fontSize);
        this.instructions = this.add.bitmapText(config.width / 2 - 96, config.height / 2 + 196, "fontPressStart", "Instructions", fontSize);

        this.arrow = this.add.image(config.width / 2 - 128, config.height / 2 + 110, 'arrow');
        this.selection = 0;

        if (mobile.matches) {
            this.playGame.setInteractive();
            this.options.setInteractive();
            this.instructions.setInteractive();
            this.arrow.setVisible(false);

            let self = this;

            this.playGame.on('pointerdown', function() {
                self.gotoGame();
            });

            this.options.on('pointerdown', function() {
                self.gotoOptions();
            });

            this.instructions.on('pointerdown', function() {
                self.gotoInstructions();
            });

        }

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys(
            {
                'up': Phaser.Input.Keyboard.KeyCodes.W,
                'down': Phaser.Input.Keyboard.KeyCodes.S,
                'left': Phaser.Input.Keyboard.KeyCodes.A,
                'right': Phaser.Input.Keyboard.KeyCodes.D,
                'enter': Phaser.Input.Keyboard.KeyCodes.ENTER,
                'f2': Phaser.Input.Keyboard.KeyCodes.F2
            });

        this.targetScene = 'level1';

        let cam = this.cameras.main;
        this.events.on('transitionout', function() {
            cam.fade(1500);
        });

        this.beep = this.sound.add('menuBeep');
        this.sndSelect = this.sound.add('menuSelect');
    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(this.cursors.right) || Phaser.Input.Keyboard.JustDown(this.wasd.right)) {
            this.selection++;
            if (soundOn) {
                this.beep.play();
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.wasd.down)) {
            this.selection++;
            if (soundOn) {
                this.beep.play();
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursors.left) || Phaser.Input.Keyboard.JustDown(this.wasd.left)) {
            this.selection--;
            if (soundOn) {
                this.beep.play();
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.wasd.up)) {
            this.selection--;
            if (soundOn) {
                this.beep.play();
            }
        }

        if (this.selection > 2) {
            this.selection = 0;
        } else if (this.selection < 0) {
            this.selection = 2;
        }

        switch(this.selection) {
            case 0:
                this.arrow.x = config.width / 2 - 128;
                this.arrow.y = config.height / 2 + 110;
                this.targetScene = 'level1';
                break;

            case 1:
                this.arrow.x = config.width / 2 - 128;
                this.arrow.y = config.height / 2 + 158;
                this.targetScene = 'options';
                break;

            case 2:
                this.arrow.x = config.width / 2 - 128;
                this.arrow.y = config.height / 2 + 206;
                this.targetScene = 'instructions';
                break;

        }

        if(Phaser.Input.Keyboard.JustDown(this.wasd.enter)) {
            if (soundOn) {
                this.sndSelect.play();
            }

            switch(this.selection) {

                case 0: // Next Level
                    this.gotoGame();

                    break;

                case 1: // Options
                    this.gotoOptions();
                    break;

                case 2: // Instructions
                    this.gotoInstructions();
                    break;

            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.wasd.f2)) {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                // On stop full screen
            } else {
                this.scale.startFullscreen();
                // On start full screen
            }
        }
    }

    gotoGame() {
        this.tweens.add({
            targets:  this.titleMusic,
            volume:   0,
            duration: 1500
        });
        this.scene.stop(this.fromScene);
        this.scene.stop('titlePage');
        this.scene.transition({
            target: this.targetScene,
            // data: this.playerInfo,
            // moveAbove: false,
            moveBelow: true,

            duration: 1500,

            // remove: true,
            sleep: true,
            allowInput: false,

            // onUpdate: null,
            // onUpdateScope: scene
        });
    }

    gotoOptions() {
        this.scene.start('options', { fromScene: this });
    }

    gotoInstructions() {
        this.scene.start('instructions');
    }

}
