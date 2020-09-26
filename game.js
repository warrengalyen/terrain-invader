let mobile = window.matchMedia("(max-width: 850px)");
let mobileSmall = window.matchMedia("(max-width: 450px)");
let gameWidth, gameHeight, scaling;

if (mobile.matches) {
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;
    scaling = Phaser.Scale.HEIGHT_CONTROLS_WIDTH;
} else {
    gameWidth = 1200;
    gameHeight = 800;
    scaling = Phaser.Scale.FIT;
}

// console.log(gameWidth);
// console.log(gameHeight);

let config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    scale: {
        mode: scaling,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: 0x000000,
    // pixelArt: true,
    scene: [Loading, Preload, TitleScene, Options, Instructions, Level1, Level2, Level3, Level4, Level5, Level6, LevelComplete, UpgradeStore, gameOver, EndGame, Pause],
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin, // The plugin class
                key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
                mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    },
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 0.25 },
            debug: false
        }
    },
    input :{
        activePointers: 4,
    }
}

const LEVELS = ['level1', 'level2', 'level3', 'level4', 'level5', 'level6'];
let currentLevel = 0;

let totalEnemiesKilled = 0;
let totalDiamondsPickedUp = 0;
let totalFuelUsed = 0;
let totalHealthLost = 0;
let totalBombsDropped = 0;
let totalTerrainUnitsDestroyed = 0;
let totalItemsPickedUp = 0;
let totalTimeMinutes = 0;
let totalTimeSeconds = 0;
let totalUpgrades = 0;

let soundOn = true;
let musicOn = true;

let game = new Phaser.Game(config);
