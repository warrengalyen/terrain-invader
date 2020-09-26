class Level6 extends Phaser.Scene {
    constructor() {
        super("level6");
    }

    init(data) {
        this.playerInfo = data;
    }

    preload() {

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
        this.levelMusic = this.sound.add('level6Music');

        if (mobile.matches) {
            // this.scale.startFullscreen();
        }

        // this.cameras.main.setVisible(false);

        // Map and Layer Creation
        this.map = this.make.tilemap({ key: "level6Map"});
        this.tileset = this.map.addTilesetImage("level5Tileset", "level5Tiles");
        buildMap(this);

        // Background
        this.background = this.add.image(0, 0, "level6Background");
        this.background.setOrigin(0, 0);
        this.background.setDepth(0);

        // World Bounds
        this.levelWidth = 1600;
        this.levelHeight = 4800;
        this.matter.world.setBounds(0, -64, this.levelWidth, this.levelHeight + 200);

        // Collision Shapes
        createCollisionShapes(this);

        // Array of all actors (other than player)
        this.actors = [];

        // Animations
        createAnimations(this);

        // Create player character
        let startingX = 800;
        let startingY = -32;
        createLander(this, startingX, startingY, this.playerInfo.mass, this.playerInfo.thrust, this.playerInfo.maxHealth, this.playerInfo.maxFuel, this.playerInfo.bombs, this.playerInfo.score, this.playerInfo.diamonds);

        // Place landing pad
        this.landingPad = this.matter.add.sprite(792, 4792, "landingPadSmall").setStatic(true).setName("landingPad");

        // Set camera bounds, zoom, and follow
        let camPadding = 64;
        if (mobile.matches) {
            camPadding = 148;
        }
        this.cameras.main.setBounds(0, -64, this.levelWidth, this.levelHeight + camPadding);
        this.cameras.main.startFollow(this.lander);
        this.cameras.main.zoom = 1;

        //  Input Events
        inputEvents(this);

        // GUI
        createGUI(this);


        // Place all items and enemies into world based on locations on map
        placeItemsAndEnemies(this);

        // Transition Events
        let cam = this.cameras.main;
        let self = this;

        this.events.on('transitionout', function() {
            setTimeout(function() {
                cam.fade(2000);
            }, 1000);

            setTimeout(function() {
                self.levelMusic.stop();
            }, 3000);
        });

        this.events.on('transitionstart', function() {
            cam.fadeIn(2000);

        });

        this.events.on('transitioncomplete', function() {
            cam.setVisible(true);
            if (musicOn) {
                self.levelMusic.play(self.musicConfig);
            }
        });

        this.events.on('transitioninit', function() {

        });

        this.levelOver = false;
        this.canMove = true;
        this.nextScene = "levelComplete";

        // Timer
        this.timeSeconds = 0;
        this.timeMinutes = 0;
        let scene = this;

        this.timer = this.time.addEvent({
            delay: 1000,                // ms
            callback: function() {
                scene.timeSeconds++;
                if (scene.timeSeconds > 59) {
                    scene.timeSeconds = 0;
                    scene.timeMinutes++;
                }
            },
            loop: true
        });


        // Sound FX
        addSoundFX(this);

        // Counter
        this.counter = 0;

        this.running = true;

    }

    update(time, delta) {

        updateGUI(this);
        this.lander.update();
        updateAllActors(this);

        if (this.lander.health <= 0) {
            this.canMove = false;
            this.nextScene = "gameOver";
            this.levelOver = true;
        }

        if (this.canMove) {
            playerControls(this);
        }

        if (this.levelOver) {
            this.tweens.add({
                targets:  this.levelMusic,
                volume:   0,
                duration: 1000
            });
            if (this.nextScene != 'gameOver') {
                this.playerInfo = {
                    health: this.lander.health,
                    maxHealth: this.lander.maxHealth,
                    fuel: this.lander.fuel,
                    maxFuel: this.lander.maxFuel,
                    bombs: this.lander.bombTypes,
                    diamonds: this.lander.diamonds,
                    thrust: this.lander.thrust,
                    mass: this.lander.landerMass,
                    timeMinutes: this.timeMinutes,
                    timeSeconds: this.timeSeconds,
                    score: this.lander.score,
                    enemiesKilled: this.lander.enemiesKilled,
                    diamondsPickedUp: this.lander.diamondsPickedUp,
                    terrainDestroyed: this.lander.terrainDestroyed,
                    bombsDropped: this.lander.bombsDropped,
                    healthLost: this.lander.healthLost,
                    fuelUsed: this.lander.fuelUsed,
                    itemsPickedUp: this.lander.itemsPickedUp
                };

                // Lower landing pad
                this.lander.y++;
                this.landingPad.setStatic(true);
                this.landingPad.y++;

                if (this.running) {
                    currentLevel++;
                    totalEnemiesKilled += this.playerInfo.enemiesKilled;
                    totalDiamondsPickedUp += this.playerInfo.diamondsPickedUp;
                    totalFuelUsed += this.playerInfo.fuelUsed;
                    totalHealthLost += this.playerInfo.healthLost;
                    totalBombsDropped += this.playerInfo.bombsDropped;
                    totalTerrainUnitsDestroyed += this.playerInfo.terrainDestroyed;
                    totalItemsPickedUp += this.playerInfo.itemsPickedUp;
                    totalTimeMinutes += this.timeMinutes;
                    totalTimeSeconds += this.timeSeconds;
                }
            }

            this.lander.setStatic(true);
            this.lander.setDepth(0);

            this.canMove = false;

            if (this.running) {
                this.scene.start(this.nextScene, this.playerInfo);
                this.running = false;
            }

            this.scene.transition({
                target: this.nextScene,
                data: this.playerInfo,
                // moveAbove: false,
                moveBelow: true,

                duration: 3000,

                // remove: true,
                sleep: true,
                allowInput: false,

                // onUpdate: null,
                // onUpdateScope: scene
            });
        }

    }


}
