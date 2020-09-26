class UpgradeStore extends Phaser.Scene {
    constructor() {
        super("upgradeStore");



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
        this.upgradeStoreMusic = this.sound.add('upgradeStoreMusic');

        this.arrow = this.add.image(config.width / 2 - 160, config.height / 2 + 262, 'arrow');
        this.selection = 0;

        let scaler = 1;

        if (mobile.matches) {
            this.arrow.setVisible(false);
            this.selection = -1;
        }

        this.cameras.main.setVisible(false);

        createGUI(this);

        if (mobile.matches) {
            this.add.bitmapText(config.width / 2 - 128, 80, "fontPressStart", "Upgrade Store", 21);

            this.landerIcon = this.add.image(config.width / 2, config.height / 2 - 168, 'landerIcon').setScale(0.5);
            this.add.bitmapText(config.width / 2 - 144, config.height / 2 - 128, "fontPressStart", "Max Hull Integrity", 16);
            this.add.bitmapText(config.width / 2 - 32, config.height / 2 - 104, "fontPressStart", "+ 100", 16);
            this.add.image(config.width / 2 - 32, config.height / 2 - 72, 'diamondIcon').setScale(0.5);
            this.add.bitmapText(config.width / 2 + 8, config.height / 2 - 76, "fontPressStart", "x 3", 16);

            this.fuelIcon = this.add.image(config.width / 2, config.height / 2 - 8, 'fuelIcon').setScale(0.5);
            this.add.bitmapText(config.width / 2 - 136, config.height / 2 + 32, "fontPressStart", "Max Fuel Capacity", 16);
            this.add.bitmapText(config.width / 2 - 32, config.height / 2 + 56, "fontPressStart", "+ 50", 16);
            this.add.image(config.width / 2 - 32, config.height / 2 + 88, 'diamondIcon').setScale(0.5);
            this.add.bitmapText(config.width / 2 + 8, config.height / 2 + 80, "fontPressStart", "x 2", 16);

            this.engineIcon = this.add.image(config.width / 2, config.height / 2 + 144, 'engineIcon').setScale(0.5);
            this.add.bitmapText(config.width / 2 - 88, config.height / 2 + 184, "fontPressStart", "Engine Power", 16);
            this.add.bitmapText(config.width / 2 - 56, config.height / 2 + 208, "fontPressStart", "Increase", 16);
            this.add.image(config.width / 2 - 32, config.height / 2 + 240, 'diamondIcon').setScale(0.5);
            this.add.bitmapText(config.width / 2 + 8, config.height / 2 + 232, "fontPressStart", "x 2", 16);

            this.nextLevel = this.add.bitmapText(config.width / 2 - 80, config.height - 48, "fontPressStart", "Next Level", 18);

            this.landerIcon.setInteractive();
            this.fuelIcon.setInteractive();
            this.engineIcon.setInteractive();
            this.nextLevel.setInteractive();

            let self = this;

            this.landerIcon.on('pointerdown', function() {
                self.upgradeHull();
            });

            this.fuelIcon.on('pointerdown', function() {
                self.upgradeFuel();
            });

            this.engineIcon.on('pointerdown', function() {
                self.upgradeEngine();
            });

            this.nextLevel.on('pointerdown', function() {
                self.gotoNextScene();
            });

        } else {
            this.add.bitmapText(config.width / 2 - 175, 96, "fontPressStart", "Upgrade Store", 28);

            this.landerIcon = this.add.image(config.width / 2 - 300, config.height / 2 - 200, 'landerIcon');
            this.add.bitmapText(config.width / 2 - 475, config.height / 2 - 120, "fontPressStart", "Max Hull Integrity", 22);
            this.add.bitmapText(config.width / 2 - 350, config.height / 2 - 92, "fontPressStart", "+ 100", 22);
            this.add.image(config.width / 2 - 342, config.height / 2 - 44, 'diamondIcon');
            this.add.bitmapText(config.width / 2 - 302, config.height / 2 - 52, "fontPressStart", "x 3", 22);

            this.fuelIcon = this.add.image(config.width / 2 + 300, config.height / 2 - 200, 'fuelIcon');
            this.add.bitmapText(config.width / 2 + 125, config.height / 2 - 120, "fontPressStart", "Max Fuel Capacity", 22);
            this.add.bitmapText(config.width / 2 + 250, config.height / 2 - 92, "fontPressStart", "+ 50", 22);
            this.add.image(config.width / 2 + 258, config.height / 2 - 44, 'diamondIcon');
            this.add.bitmapText(config.width / 2 + 298, config.height / 2 - 52, "fontPressStart", "x 2", 22);

            this.engineIcon = this.add.image(config.width / 2 - 300, config.height / 2 + 82, 'engineIcon');
            this.add.bitmapText(config.width / 2 - 435, config.height / 2 + 164, "fontPressStart", "Engine Power", 22);
            this.add.bitmapText(config.width / 2 - 380, config.height / 2 + 192, "fontPressStart", "Increase", 22);
            this.add.image(config.width / 2 - 342, config.height / 2 + 242, 'diamondIcon');
            this.add.bitmapText(config.width / 2 - 302, config.height / 2 + 234, "fontPressStart", "x 2", 22);

            this.add.bitmapText(config.width / 2 - 125, config.height / 2 + 300, "fontPressStart", "Next Level", 24);
        }


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

        let cam = this.cameras.main;
        let self = this;
        this.fromScene;
        this.targetScene = LEVELS[currentLevel];

        this.events.on('transitioncomplete', function(fromScene){
            cam.setVisible(true);
            self.fromScene = fromScene
            if (musicOn) {
                self.upgradeStoreMusic.play(self.musicConfig);
            }
        });

        this.events.on('transitionout', function() {
            self.upgradeStoreMusic.stop();
        });

        this.beep = this.sound.add('menuBeep');
        this.sndSelect = this.sound.add('menuSelect');
        this.sndUpgrade = this.sound.add('pickup');

    }

    update() {

        this.updateUI();

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

        if (this.selection > 3) {
            this.selection = 0;
        } else if (this.selection < 0) {
            this.selection = 3;
        }

        switch(this.selection) {
            case 0:
                this.arrow.x = config.width / 2 - 396;
                this.arrow.y = config.height / 2 - 208;
                break;

            case 1:
                this.arrow.x = config.width / 2 + 212;
                this.arrow.y = config.height / 2 - 208;
                break;

            case 2:
                this.arrow.x = config.width / 2 - 396;
                this.arrow.y = config.height / 2 + 82;
                break;

            case 3:
                this.arrow.x = config.width / 2 - 160;
                this.arrow.y = config.height / 2 + 310;
                break;
        }

        if(Phaser.Input.Keyboard.JustDown(this.wasd.enter)) {

            switch(this.selection) {
                case 0: // Hull Upgrade
                    this.upgradeHull();
                    break;

                case 1: // Fuel Upgrade
                    this.upgradeFuel();
                    break;

                case 2: // Engine Upgrade
                    this.upgradeEngine();
                    break;

                case 3: // Next Level
                    this.gotoNextScene();
                    break;

            }

        }
    }

    updateUI() {
        this.diamondDisplay.setText("x " + this.playerInfo.diamonds);

        if (mobile.matches) {
            this.integrityDisplay.setText('H: ' + this.playerInfo.maxHealth.toFixed(1) + "/" + this.playerInfo.maxHealth);
            this.fuelDisplay.setText('F: ' + this.playerInfo.maxFuel.toFixed(1) + '/' + this.playerInfo.maxFuel);
        } else {
            this.integrityDisplay.setText('Hull: ' + this.playerInfo.maxHealth.toFixed(2) + " / " + this.playerInfo.maxHealth);
            this.fuelDisplay.setText('Fuel: ' + this.playerInfo.maxFuel.toFixed(2) + ' / ' + this.playerInfo.maxFuel);
        }

        this.diamondDisplay.setText(' x ' + this.playerInfo.diamonds);
        let bombType = this.playerInfo.bombs[0].type;
        this.bombImageDisplay.setTexture(bombType);
        if (bombType == 'largeBomb') {
            this.bombImageDisplay.setScale(0.5);
        } else {
            this.bombImageDisplay.setScale(1);
        }
        this.bombDisplay.setText(' x ' + this.playerInfo.bombs[0].quantity);
        if (!mobile.matches) {
            this.speedDisplay.setText('Speed: 0');
            this.timeDisplay.setText('Time: 0:00');
            this.scoreDisplay.setText('Score: ' + this.playerInfo.score);
        }
    }

    upgradeHull() {
        totalUpgrades++;
        if (soundOn) {
            this.sndUpgrade.play();
        }
        if (this.playerInfo.diamonds >= 3) {
            this.playerInfo.diamonds -= 3;
            this.playerInfo.maxHealth += 100;
        }
    }

    upgradeFuel() {
        totalUpgrades++;
        if (soundOn) {
            this.sndUpgrade.play();
        }
        if (this.playerInfo.diamonds >= 2) {
            this.playerInfo.diamonds -= 2;
            this.playerInfo.maxFuel += 50;
        }
    }

    upgradeEngine() {
        totalUpgrades++;
        if (soundOn) {
            this.sndUpgrade.play();
        }
        if (this.playerInfo.diamonds >= 2) {
            this.playerInfo.diamonds -= 2;
            this.playerInfo.thrust += 0.002;
        }
    }

    gotoNextScene() {
        if (soundOn) {
            this.sndSelect.play();
        }
        this.scene.stop(this.fromScene);
        this.scene.stop('upgradeStore');
        this.scene.start(this.targetScene, this.playerInfo);
        this.scene.transition({
            target: this.targetScene,
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
