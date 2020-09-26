class Options extends Phaser.Scene {
    constructor() {
        super("options");
    }

    init(data) {
        this.data = data;
    }

    preload() {

    }

    create() {
        this.titleScene = this.data.fromScene;

        this.arrow = this.add.image(config.width / 2 - 160, config.height - 54, 'arrow');
        this.selection = 0;

        this.add.bitmapText(config.width / 2 - 100, 32, "fontPressStart", "Options", 24);

        if (soundOn) {
            this.soundDisplay = this.add.bitmapText(config.width / 2 - 150, 128, "fontPressStart", "Sound FX: ON", 22);
        } else {
            this.soundDisplay = this.add.bitmapText(config.width / 2 - 150, 128, "fontPressStart", "Sound FX: OFF", 22);
        }

        if (musicOn) {
            this.musicDisplay = this.add.bitmapText(config.width / 2 - 150, 192, "fontPressStart", "Music: ON", 22);
        } else {
            this.musicDisplay = this.add.bitmapText(config.width / 2 - 150, 192, "fontPressStart", "Music: OFF", 22);
        }

        this.mainMenu = this.add.bitmapText(config.width / 2 - 96, config.height - 64, "fontPressStart", "Main Menu", 24);

        if (mobile.matches) {
            this.arrow.setVisible(false);
            this.selection = -1;
            this.soundDisplay.setInteractive();
            this.musicDisplay.setInteractive();
            this.mainMenu.setInteractive();

            let self = this;

            this.soundDisplay.on('pointerdown', function() {
                self.changeSoundFX();
            });

            this.musicDisplay.on('pointerdown', function() {
                self.changeMusic();
            });

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

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys(
            {
                'up': Phaser.Input.Keyboard.KeyCodes.W,
                'down': Phaser.Input.Keyboard.KeyCodes.S,
                'left': Phaser.Input.Keyboard.KeyCodes.A,
                'right': Phaser.Input.Keyboard.KeyCodes.D,
                'enter': Phaser.Input.Keyboard.KeyCodes.ENTER
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
                this.arrow.x = config.width / 2 - 175;
                this.arrow.y = 138;
                break;

            case 1:
                this.arrow.x = config.width / 2 - 175;
                this.arrow.y = 202;
                break;

            case 2:
                this.arrow.x = config.width / 2 - 160;
                this.arrow.y = config.height - 54;
                break;

        }

        if(Phaser.Input.Keyboard.JustDown(this.wasd.enter)) {
            if (soundOn) {
                this.sndSelect.play();
            }
            switch(this.selection) {
                case 0:
                    this.changeSoundFX();
                    break;

                case 1:
                    this.changeMusic();
                    break;

                case 2:
                    this.gotoNextScene();
                    break;

            }
        };
    }

    changeSoundFX() {
        soundOn = !soundOn;
        if (soundOn) {
            this.soundDisplay.setText('Sound FX: ON');
        } else {
            this.soundDisplay.setText('Sound FX: OFF');
        }
    }

    changeMusic() {
        musicOn = !musicOn;
        if (musicOn) {
            this.musicDisplay.setText('Music: ON');
            if (!this.titleScene.musicPlaying && !this.titleScene.titleMusic.mute) {
                this.titleScene.titleMusic.play(this.titleScene.musicConfig);
            } else if (this.titleScene.titleMusic.mute) {
                this.titleScene.titleMusic.setMute(false);
            }
            this.titleScene.musicPlaying = true;
        } else {
            this.musicDisplay.setText('Music: OFF');
            // this.titleScene.titleMusic.stop();
            this.titleScene.titleMusic.setMute(true);
            this.titleScene.musicPlaying = false;
        }
    }

    gotoNextScene() {
        this.scene.stop();
        this.scene.start('titleScene');
    }

}
