class EndGame extends Phaser.Scene {
    constructor() {
        super("endGame");

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
        this.endGameMusic = this.sound.add('endGameMusic');

        let totalHours = 0;
        let totalMinutes = totalTimeMinutes;
        let totalSeconds = totalTimeSeconds;
        while (totalSeconds > 59) {
            totalMinutes++;
            totalSeconds -= 60;
        }
        while (totalMinutes > 59) {
            totalHours++;
            totalMinutes -= 60;
        }
        this.arrow = this.add.image(config.width / 2 - 202, config.height / 2 + 87, 'arrow');
        this.cameras.main.setVisible(false);

        if (mobile.matches) {
            this.arrow.setVisible(false);
            this.add.bitmapText(16, 64, "fontPressStart", "You beat the game!", 18);
            this.add.bitmapText(16, 128, "fontPressStart", "Final Score: " + this.playerInfo.score, 14);
            this.add.bitmapText(16, 160, "fontPressStart", "Time Played: " + totalHours.toString().padStart(2, '0') + ":" + totalMinutes.toString().padStart(2, '0') + ":" + totalSeconds.toFixed(0).padStart(2, '0'), 10);
            this.add.bitmapText(16, 192, "fontPressStart", "Health Lost: " + totalHealthLost.toFixed(2), 10);
            this.add.bitmapText(16, 224, "fontPressStart", "Fuel Used: " + totalFuelUsed.toFixed(2), 10);
            this.add.bitmapText(16, 256, "fontPressStart", "Enemies Destroyed: " + totalEnemiesKilled, 10);
            this.add.bitmapText(16, 288, "fontPressStart", "Bombs Dropped: " + totalBombsDropped, 10);
            this.add.bitmapText(16, 320, "fontPressStart", "Items Picked Up: " + totalItemsPickedUp, 10);
            this.add.bitmapText(16, 352, "fontPressStart", "Diamonds Picked Up: " + totalDiamondsPickedUp, 10);
            this.add.bitmapText(16, 384, "fontPressStart", "Upgrades Purchased: " + totalUpgrades, 10);
            this.add.bitmapText(16, 416, "fontPressStart", "Terrain Blocks Destroyed: " + totalTerrainUnitsDestroyed, 10);
            this.newGame = this.add.bitmapText(32, config.height - 96, "fontPressStart", "New Game +", 28);
            this.newGame.setInteractive();
            let self = this;

            this.newGame.on('pointerdown', function() {
                self.gotoFirstScene();
            });

        } else {
            this.add.bitmapText(config.width / 2 - 260, 64, "fontPressStart", "You beat the game!", 28);
            this.add.bitmapText(config.width / 2 - 210, 128, "fontPressStart", "Final Score: " + this.playerInfo.score, 18);
            this.add.bitmapText(config.width / 2 - 210, 160, "fontPressStart", "Time Played: " + totalHours.toString().padStart(2, '0') + ":" + totalMinutes.toString().padStart(2, '0') + ":" + totalSeconds.toFixed(0).padStart(2, '0'), 18);
            this.add.bitmapText(config.width / 2 - 210, 192, "fontPressStart", "Health Lost: " + totalHealthLost.toFixed(2), 18);
            this.add.bitmapText(config.width / 2 - 210, 224, "fontPressStart", "Fuel Used: " + totalFuelUsed.toFixed(2), 18);
            this.add.bitmapText(config.width / 2 - 210, 256, "fontPressStart", "Enemies Destroyed: " + totalEnemiesKilled, 18);
            this.add.bitmapText(config.width / 2 - 210, 288, "fontPressStart", "Bombs Dropped: " + totalBombsDropped, 18);
            this.add.bitmapText(config.width / 2 - 210, 320, "fontPressStart", "Items Picked Up: " + totalItemsPickedUp, 18);
            this.add.bitmapText(config.width / 2 - 210, 352, "fontPressStart", "Diamonds Picked Up: " + totalDiamondsPickedUp, 18);
            this.add.bitmapText(config.width / 2 - 210, 384, "fontPressStart", "Upgrades Purchased: " + totalUpgrades, 18);
            this.add.bitmapText(config.width / 2 - 210, 416, "fontPressStart", "Terrain Blocks Destroyed: " + totalTerrainUnitsDestroyed, 18);
            this.add.bitmapText(config.width / 2 - 170, config.height / 2 + 75, "fontPressStart", "New Game +", 28);
        }

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        let cam = this.cameras.main;

        let self = this;
        this.fromScene;

        this.events.on('transitionout', function() {

            cam.fade(1000);

            setTimeout(function() {
                self.endGameMusic.stop();
            }, 1500);
        });

        this.events.on('transitioncomplete', function(fromScene){
            cam.setVisible(true);
            self.fromScene = fromScene;
            if (musicOn) {
                self.endGameMusic.play(self.musicConfig);
            }
        });

        this.sndSelect = this.sound.add('menuSelect');

    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.gotoFirstScene();
        }
    }

    gotoFirstScene() {
        this.tweens.add({
            targets:  this.endGameMusic,
            volume:   0,
            duration: 1000
        });
        currentLevel = 0;
        if (soundOn) {
            this.sndSelect.play();
        }
        this.cameras.main.setVisible(false);
        this.scene.start(LEVELS[currentLevel], this.playerInfo);
        this.scene.stop(this.fromScene);
        this.scene.stop('endGame');
        this.scene.transition({
            target: LEVELS[currentLevel],
            data: this.playerInfo,
            // moveAbove: false,
            moveBelow: true,

            duration: 2000,

            // remove: true,
            sleep: true,
            allowInput: false,

            // onUpdate: null,
            // onUpdateScope: scene
        });
    }
};
