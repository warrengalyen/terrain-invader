class LevelComplete extends Phaser.Scene {
    constructor() {
        super("levelComplete");



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
        this.levelCompleteMusic = this.sound.add('levelCompleteMusic');

        this.arrow = this.add.image(config.width / 2 - 390, config.height / 2 + 160, 'arrow');
        this.selection = 0;

        this.cameras.main.setVisible(false);

        this.calculateScore();

        let fontScaler = 1;
        if (mobile.matches) {
            fontScaler = 0.75;
            this.arrow.setVisible(false);
        }


        if (mobile.matches) {
            this.add.bitmapText(config.width / 2 - 76, 96, "fontPressStart", "Invasion", 28 * fontScaler);
            this.add.bitmapText(config.width / 2 - 104, 128, "fontPressStart", "Successful!", 28 * fontScaler);
            this.add.bitmapText(config.width / 2 - 128, config.height / 2 - 100, "fontPressStart", 'Time: ' + this.playerInfo.timeMinutes.toString().padStart(2, '0') + ":" + this.playerInfo.timeSeconds.toFixed(0).padStart(2, '0'), 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 128, config.height / 2 - 75, "fontPressStart", "Hull Integrity: " + this.healthPercent + "%", 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 128, config.height / 2 - 50, "fontPressStart", "Fuel Remaining: " + this.fuelPercent + "%", 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 128, config.height / 2 - 25, "fontPressStart", "Enemies Killed: " + this.playerInfo.enemiesKilled, 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 128, config.height / 2, "fontPressStart", "Diamonds Picked Up: " + this.playerInfo.diamondsPickedUp, 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 128, config.height / 2 + 50, "fontPressStart", "Score: " + this.playerInfo.score, 16 * fontScaler);

            this.upgradeStore = this.add.bitmapText(config.width / 2 - 112, config.height - 196, "fontPressStart", "Upgrade Store", 24 * fontScaler);
            this.nextLevel = this.add.bitmapText(config.width / 2 - 92, config.height - 128, "fontPressStart", "Next Level", 24 * fontScaler);
            if (currentLevel == LEVELS.length - 1) {
                this.nextLevel.setText('Final Level');
            }
            this.nextLevel.setInteractive();

            if (currentLevel >= LEVELS.length) {
                this.nextLevel.setText('Continue');
                this.upgradeStore.setText("");
                this.selection = 1;
                this.lastLevel = true;
            } else {
                this.upgradeStore.setInteractive();
            }

            let self = this;

            this.selection = -1;

            this.upgradeStore.on('pointerdown', function() {
                self.gotoNextScene('upgradeStore');
            });

            this.nextLevel.on('pointerdown', function() {
                let nextScene = LEVELS[currentLevel];
                if (self.lastLevel) {
                    nextScene = 'endGame';
                }
                self.gotoNextScene(nextScene);
            });
        } else {
            this.add.bitmapText(config.width / 2 - 250, config.height / 2 - 175, "fontPressStart", "Invasion Successful!", 28 * fontScaler);
            this.add.bitmapText(config.width / 2 - 200, config.height / 2 - 100, "fontPressStart", 'Time: ' + this.playerInfo.timeMinutes.toString().padStart(2, '0') + ":" + this.playerInfo.timeSeconds.toFixed(0).padStart(2, '0'), 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 200, config.height / 2 - 75, "fontPressStart", "Hull Integrity: " + this.healthPercent + "%", 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 200, config.height / 2 - 50, "fontPressStart", "Fuel Remaining: " + this.fuelPercent + "%", 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 200, config.height / 2 - 25, "fontPressStart", "Enemies Killed: " + this.playerInfo.enemiesKilled, 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 200, config.height / 2, "fontPressStart", "Diamonds Picked Up: " + this.playerInfo.diamondsPickedUp, 16 * fontScaler);
            this.add.bitmapText(config.width / 2 - 200, config.height / 2 + 50, "fontPressStart", "Score: " + this.playerInfo.score, 16 * fontScaler);

            this.upgradeStore = this.add.bitmapText(config.width / 2 - 350, config.height / 2 + 150, "fontPressStart", "Upgrade Store", 24 * fontScaler);
            this.nextLevel = this.add.bitmapText(config.width / 2 + 125, config.height / 2 + 150, "fontPressStart", "Next Level", 24 * fontScaler);
            if (currentLevel == LEVELS.length - 1) {
                this.nextLevel.setText('Final Level');
            }
            this.lastLevel = false;
            if (currentLevel >= LEVELS.length) {
                this.nextLevel.x = config.width / 2 - 96;
                this.arrow.x = config.width / 2 - 128;
                this.nextLevel.setText('Continue');
                this.upgradeStore.setText("");
                this.targetScene = 'endGame';
                this.selection = 1;
                this.lastLevel = true;
            } else {
                this.targetScene = 'upgradeStore';
            }
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
                'f12': Phaser.Input.Keyboard.KeyCodes.F12
            });

        let cam = this.cameras.main;
        let self = this;
        this.fromScene;

        this.events.on('transitioncomplete', function(fromScene){
            cam.setVisible(true);
            self.fromScene = fromScene
            if (musicOn) {
                self.levelCompleteMusic.play(self.musicConfig);
            }
        });

        this.events.on('transitionout', function() {
            self.levelCompleteMusic.stop();
        });

        this.beep = this.sound.add('menuBeep');
        this.sndSelect = this.sound.add('menuSelect');


    }

    update() {
        if (!this.lastLevel) {
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

            if (Phaser.Input.Keyboard.JustDown(this.wasd.f12)) {
                currentLevel++;
                console.log(currentLevel);
            }
        }

        if (this.selection > 1) {
            this.selection = 0;
        } else if (this.selection < 0) {
            this.selection = 1;
        }

        switch(this.selection) {
            case 0:
                this.arrow.x = config.width / 2 - 390;
                this.targetScene = 'upgradeStore';
                break;

            case 1:
                if (currentLevel >= LEVELS.length) {
                    this.arrow.x = config.width / 2 - 128;
                } else {
                    this.arrow.x = config.width / 2 + 85;
                }
                if (currentLevel >= LEVELS.length) {
                    this.targetScene = 'endGame';
                } else {
                    this.targetScene = LEVELS[currentLevel];
                }
                break;
        }

        if(Phaser.Input.Keyboard.JustDown(this.wasd.enter)) {
            this.gotoNextScene(this.targetScene);

        }
    }



    calculateScore() {
        let addToScore = 0;
        this.fuelPercent = Math.round((this.playerInfo.fuel / this.playerInfo.maxFuel) * 100);
        addToScore += this.fuelPercent;
        this.healthPercent = Math.round((this.playerInfo.health / this.playerInfo.maxHealth) * 100);
        addToScore += this.healthPercent;
        this.playerInfo.score += addToScore;
    }

    gotoNextScene(nextScene) {

        if (soundOn) {
            this.sndSelect.play();
        }
        this.cameras.main.setVisible(false);
        this.scene.start(nextScene, this.playerInfo);
        this.scene.stop(this.fromScene);
        this.scene.stop('levelComplete');
        this.scene.transition({
            target: nextScene,
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


}
