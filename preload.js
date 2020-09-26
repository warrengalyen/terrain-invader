class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {

        this.load.image('titleImage', './assets/titleImage.png');

        // Music
        this.load.audio('titleMusic', './assets/music/titleMusic.mp3');
        this.load.audio('level1Music', './assets/music/level1Music.mp3');
        this.load.audio('level2Music', './assets/music/level2Music.mp3');
        this.load.audio('level3Music', './assets/music/level3Music.mp3');
        this.load.audio('level4Music', './assets/music/level4Music.mp3');
        this.load.audio('level5Music', './assets/music/level5Music.mp3');
        this.load.audio('level6Music', './assets/music/level6Music.mp3');
        this.load.audio('gameOverMusic', './assets/music/gameOverMusic.mp3');
        this.load.audio('levelCompleteMusic', './assets/music/levelCompleteMusic.mp3');
        this.load.audio('endGameMusic', './assets/music/endGameMusic.mp3');
        this.load.audio('upgradeStoreMusic', './assets/music/upgradeStoreMusic.mp3');

        this.load.image('arrow', './assets/selectionArrow.png');

        // Backgrounds

        this.load.image('titleBackground', './assets/backgrounds/titleBackground.png');
        this.load.image("level1Background", "./assets/backgrounds/level1Background.jpg");
        this.load.image('level2Background', './assets/backgrounds/level2Background.jpg');
        this.load.image('level3Background', './assets/backgrounds/level3Background.jpg');
        this.load.image('level4Background', './assets/backgrounds/level4Background2.jpg');
        this.load.image('level5Background', './assets/backgrounds/level5Background.jpg');
        this.load.image('level6Background', './assets/backgrounds/level6Background.jpg');

        this.load.image("lander", "./assets/lander2-flipped.png");
        this.load.json("landerShape", "./assets/lander2.json");

        // Icons

        this.load.image('cursorKeyUp', './assets/icons/cursorKeyUp.png');
        this.load.image('cursorKeyDown', './assets/icons/cursorKeyDown.png');
        this.load.image('cursorKeyLeft', './assets/icons/cursorKeyLeft.png');
        this.load.image('cursorKeyRight', './assets/icons/cursorKeyRight.png');

        this.load.image('landerIcon', './assets/icons/lander128.png');
        this.load.image('fuelIcon', './assets/icons/fuelcan128.png');
        this.load.image('diamondIcon', './assets/icons/diamond64.png');
        this.load.image('engineIcon', './assets/icons/engine128.png');

        this.load.image('landerWithFlame', './assets/icons/landerWithFlame128.png');

        // Buttons

        this.load.image('upButton', './assets/buttons/upButton.png');
        this.load.image('downButton', './assets/buttons/downButton.png');
        this.load.image('leftButton', './assets/buttons/leftButton.png');
        this.load.image('rightButton', './assets/buttons/rightButton.png');
        this.load.image('bombButton', './assets/buttons/bombButtonBig2.png');
        this.load.image('typeButton', './assets/buttons/typeButtonBig.png');
        this.load.image('pauseButton', './assets/buttons/pauseButtonBig.png');
        this.load.image('unpauseButton', './assets/buttons/unpauseButton.png');

        // Bombs

        this.load.image("smallBomb", "./assets/smallBomb.png");
        this.load.json("bombShape", "./assets/bombCollision.json");
        this.load.image('mediumBomb', './assets/mediumBomb.png');
        this.load.json('mediumBombShape', './assets/mediumBombShape.json');
        this.load.image('largeBomb', './assets/largeBomb.png');
        this.load.json('largeBombShape', './assets/largeBombShape.json');
        this.load.image('clusterBomb', './assets/clusterBomb.png');

        // Particle FX

        this.load.spritesheet('explosion1', './assets/particleFX/explosion4Med.png', {
            frameWidth: 80,
            frameHeight: 80
        });

        this.load.spritesheet('airBurst', './assets/particleFX/airBurst.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('airBurstLeft', './assets/particleFX/airBurstLeft.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('fireStream', './assets/particleFX/fireStream.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet('fireBall', './assets/particleFX/fireBall.png', {
            frameWidth: 100,
            frameHeight: 100
        });

        // Enemies

        this.load.image("turretBase", "./assets/turretBase.png");
        this.load.json("turretBaseShape", "./assets/turretBaseShape.json");
        this.load.image('turretBarrel', "./assets/turretBarrel96x16.png");
        this.load.image('mortar', "./assets/mortar.png");
        this.load.json('mortarShape', "./assets/mortarShape.json");

        this.load.image('lavaSnail', './assets/enemies/lavaSnail.png');
        this.load.json('lavaSnailShape', './assets/enemies/lavaSnailShape.json');

        this.load.image('lavaTrail', './assets/enemies/lavaTrail.png');

        this.load.spritesheet('rockman', './assets/enemies/rockman.png', {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.json('rockmanShape', './assets/enemies/rockmanShape.json');

        this.load.image('wormHead', './assets/enemies/wormHead.png');
        this.load.image('wormBody', './assets/enemies/wormBodyOneColour.png');
        this.load.json('wormHeadShape', './assets/enemies/wormheadShape.json');

        this.load.image('robot', './assets/enemies/robot.png');
        this.load.json('robotShape', './assets/enemies/robotShape.json');
        this.load.image('robotBarrel', './assets/enemies/robotBarrel.png');
        this.load.image('robotMortar', './assets/enemies/robotMortar.png');
        this.load.json('robotMortarShape', './assets/enemies/robotMortarShape.json');

        // Pickups

        this.load.image("bombPickup", "./assets/bombPickup.png");
        this.load.image("mediumBombPickup", "./assets/mediumBombPickup.png");
        this.load.image("largeBombPickup", "./assets/largeBombPickup.png");
        this.load.image('clusterBombPickup', './assets/clusterBombPickup.png');
        this.load.image("fuelPickup", "./assets/fuelPickup.png");
        this.load.image("repairPickup", "./assets/repairPickup.png");

        this.load.json("pickupShape", "./assets/pickupShape.json");

        this.load.spritesheet("diamondPickup", "./assets/diamondAnim.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.json("diamondShape", "./assets/diamondShape.json");

        this.load.spritesheet('sparkle', './assets/particleFX/sparkle.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('lava', './assets/lava_spr_circle_strip45.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.json('lavaShape', './assets/lavaCircle.json');

        this.load.image("landingPadBig", "./assets/landingPadBig.png");
        this.load.image("landingPadMed", "./assets/landingPadMed.png");
        this.load.image("landingPadSmall", "./assets/landingPadSmall2.png");

        // Maps and Tilesets

        this.load.tilemapTiledJSON("level1Map", "./assets/maps/level1Map.json");
        this.load.image("tiles", "./assets/tilesets/meadowDayTileset.png");

        this.load.tilemapTiledJSON("level2Map", "./assets/maps/level2Map.json");
        this.load.image("level2Tiles", "./assets/tilesets/level2Tileset.png");

        this.load.tilemapTiledJSON("level3Map", "./assets/maps/level3Map.json");
        this.load.image("level3Tiles", "./assets/tilesets/level3Tileset.png");

        this.load.tilemapTiledJSON("level4Map", "./assets/maps/level4Map.json");
        this.load.image("level4Tiles", "./assets/tilesets/level4Tileset.png");

        this.load.tilemapTiledJSON("level5Map", "./assets/maps/level5Map.json");
        this.load.image("level5Tiles", "./assets/tilesets/level5Tileset.png");

        this.load.tilemapTiledJSON("level6Map", "./assets/maps/level6Map2.json");

        this.load.atlas("meteors", "./assets/meteors.png", "./assets/meteors.json");
        this.load.json("meteorShape64x64", "./assets/meteorShape64x64.json");
        this.load.json("meteorShape32x32", "./assets/meteorShape32x32.json");
        this.load.json("meteorShape16x16", "./assets/meteorShape16x16.json");

        this.load.spritesheet("explosion", "./assets/explosion.png", {
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet('nukeExplosion', './assets/nukeExplosion72x64.png', {
            frameWidth: 72,
            frameHeight: 64
        });

        this.load.spritesheet("engineThrust", "./assets/Small_Fireball_10x26.png", {
            frameWidth: 10,
            frameHeight: 26
        });

        this.load.spritesheet("drill", "./assets/drillSheet.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.bitmapFont('fontFuture', './assets/fonts/font.png', './assets/fonts/font.fnt');

        this.load.image('guiFrame', './assets/guiFrame5.png');
        this.load.image('mobileGuiFrame', './assets/mobileGUIFrame.png');
        this.load.image('mobileGuiBottomFrame', './assets/mobileGUIBottomFrame80.png');

        this.load.image('diamond', './assets/diamond.png');

        // Sound FX

        this.load.audio('explosion', './assets/soundFX/explosion2.ogg');
        this.load.audio('pickup', './assets/soundFX/pickup.ogg');
        this.load.audio('terrainHit', './assets/soundFX/terrainHit.ogg');
        this.load.audio('thrusting', './assets/soundFX/thrusting16bit.ogg', './assets/soundFX/thrusting16bit.mp3');
        this.load.audio('drilling', './assets/soundFX/drilling.ogg');
        this.load.audio('menuBeep', './assets/soundFX/menuBeep2.ogg');
        this.load.audio('menuSelect', './assets/soundFX/menuSelect2.ogg');


        // Level 2

        // this.load.image("level2Background", "./assets/spaceLandscapeBG2.png");

        // this.load.tilemapTiledJSON("level2Map", "./assets/alienLandscapeMap6.json");
        // this.load.image("level2Tiles", "./assets/alienworld_tileset3.png");

    }

    create() {
        this.add.bitmapText(config.width / 2 - 16, config.height / 2, "fontPressStart", "Loading...", 24);

        this.scene.stop('loading');
        this.scene.start('titleScene');
    }

}
