function buildMap(thisScene) {
    thisScene.terrainLayer = thisScene.map.createDynamicLayer("terrain", thisScene.tileset, 0, 0);
    thisScene.lavaLayer = thisScene.map.createStaticLayer("lava", thisScene.tileset, 0, 0);
    thisScene.stoneLayer = thisScene.map.createStaticLayer("stone", thisScene.tileset, 0, 0);
    thisScene.bombPickupLayer = thisScene.map.createStaticLayer("bombPickup", thisScene.tileset, 0, 0);
    thisScene.mediumBombPickupLayer = thisScene.map.createStaticLayer("mediumBombPickup", thisScene.tileset, 0, 0);
    thisScene.largeBombPickupLayer = thisScene.map.createStaticLayer("largeBombPickup", thisScene.tileset, 0, 0);
    thisScene.clusterBombPickupLayer = thisScene.map.createStaticLayer("clusterBombPickup", thisScene.tileset, 0, 0);
    thisScene.fuelPickupLayer = thisScene.map.createStaticLayer("fuelPickup", thisScene.tileset, 0, 0);
    thisScene.repairPickupLayer = thisScene.map.createStaticLayer("repairPickup", thisScene.tileset, 0, 0);
    thisScene.diamondLayer = thisScene.map.createStaticLayer("diamondPickup", thisScene.tileset, 0, 0);
    thisScene.turretLayer = thisScene.map.createStaticLayer("turrets", thisScene.tileset, 0, 0);
    thisScene.wormUpLayer = thisScene.map.createStaticLayer("wormsUp", thisScene.tileset, 0, 0);
    thisScene.wormDownLayer = thisScene.map.createStaticLayer("wormsDown", thisScene.tileset, 0, 0);
    thisScene.rockmanLayer = thisScene.map.createStaticLayer("rockmans", thisScene.tileset, 0, 0);
    thisScene.lavaSnailLayer = thisScene.map.createStaticLayer("lavaSnails", thisScene.tileset, 0, 0);
    thisScene.volcanoLayer = thisScene.map.createStaticLayer("volcanoes", thisScene.tileset, 0, 0);
    thisScene.robotLayer = thisScene.map.createStaticLayer("robots", thisScene.tileset, 0, 0);

    thisScene.terrainLayer.setDepth(1);
    thisScene.terrainLayer.setCollisionByProperty({ collides: true });
    thisScene.lavaLayer.setDepth(1);
    thisScene.lavaLayer.setCollisionByProperty({ collides: true });

    thisScene.bombPickupIndex = [];
    thisScene.bombPickupLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.bombPickupIndex.push([e.x, e.y]);
        }
    });
    thisScene.bombPickupLayer.destroy();

    thisScene.mediumBombPickupIndex = [];
    thisScene.mediumBombPickupLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.mediumBombPickupIndex.push([e.x, e.y]);
        }
    });
    thisScene.mediumBombPickupLayer.destroy();

    thisScene.largeBombPickupIndex = [];
    thisScene.largeBombPickupLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.largeBombPickupIndex.push([e.x, e.y]);
        }
    });
    thisScene.largeBombPickupLayer.destroy();

    thisScene.clusterBombPickupIndex = [];
    thisScene.clusterBombPickupLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.clusterBombPickupIndex.push([e.x, e.y]);
        }
    });
    thisScene.clusterBombPickupLayer.destroy();

    thisScene.fuelPickupIndex = [];
    thisScene.fuelPickupLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.fuelPickupIndex.push([e.x, e.y]);
        }
    });
    thisScene.fuelPickupLayer.destroy();

    thisScene.repairPickupIndex = [];
    thisScene.repairPickupLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.repairPickupIndex.push([e.x, e.y]);
        }
    });
    thisScene.repairPickupLayer.destroy();

    thisScene.diamondIndex = [];
    thisScene.diamondLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.diamondIndex.push([e.x, e.y]);
        }
    });
    thisScene.diamondLayer.destroy();

    thisScene.turretIndex = [];
    thisScene.turretLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.turretIndex.push([e.x, e.y]);
        }
    });
    thisScene.turretLayer.destroy();

    thisScene.wormUpIndex = [];
    thisScene.wormUpLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.wormUpIndex.push([e.x, e.y]);
        }
    });
    thisScene.wormUpLayer.destroy();

    if (thisScene.wormDownLayer != null) {
        thisScene.wormDownIndex = [];
        thisScene.wormDownLayer.forEachTile(function(e) {
            if (e.index != -1) {
                thisScene.wormDownIndex.push([e.x, e.y]);
            }
        });
        thisScene.wormDownLayer.destroy();
    }


    thisScene.rockmanIndex = [];
    thisScene.rockmanLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.rockmanIndex.push([e.x, e.y]);
        }
    });
    thisScene.rockmanLayer.destroy();

    thisScene.lavaSnailIndex = [];
    thisScene.lavaSnailLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.lavaSnailIndex.push([e.x, e.y]);
        }
    });
    thisScene.lavaSnailLayer.destroy();

    thisScene.volcanoIndex = [];
    thisScene.volcanoLayer.forEachTile(function(e) {
        if (e.index != -1) {
            thisScene.volcanoIndex.push([e.x, e.y]);
        }
    });
    thisScene.volcanoLayer.destroy();

    if (thisScene.robotLayer != null) {
        thisScene.robotIndex = [];
        thisScene.robotLayer.forEachTile(function(e) {
            if (e.index != -1) {
                thisScene.robotIndex.push([e.x, e.y]);
            }
        });
        thisScene.robotLayer.destroy();
    }



    thisScene.stoneLayer.setDepth(1);
    thisScene.stoneLayer.setCollisionByProperty({ collides: true });
    thisScene.matter.world.convertTilemapLayer(thisScene.terrainLayer);
    thisScene.matter.world.convertTilemapLayer(thisScene.lavaLayer);
    thisScene.matter.world.convertTilemapLayer(thisScene.stoneLayer);

}

function createCollisionShapes(thisScene)  {
    thisScene.meteorShapes = [];
    let meteorShape64x64 = thisScene.cache.json.get('meteorShape64x64');
    thisScene.meteorShapes.push(meteorShape64x64);
    let meteorShape32x32 = thisScene.cache.json.get('meteorShape32x32');
    thisScene.meteorShapes.push(meteorShape32x32);
    let meteorShape16x16 = thisScene.cache.json.get('meteorShape16x16');
    thisScene.meteorShapes.push(meteorShape16x16);
    thisScene.bombShape = thisScene.cache.json.get('bombShape');
    thisScene.pickupShape = thisScene.cache.json.get('pickupShape');
    thisScene.lavaShape = thisScene.cache.json.get('lavaShape');
    thisScene.turretBaseShape = thisScene.cache.json.get("turretBaseShape");
    thisScene.mortarShape = thisScene.cache.json.get('mortarShape');
    thisScene.diamondShape = thisScene.cache.json.get('diamondShape');
    thisScene.mediumBombShape = thisScene.cache.json.get('mediumBombShape');
    thisScene.largeBombShape = thisScene.cache.json.get('largeBombShape');
    thisScene.lavaSnailShape = thisScene.cache.json.get('lavaSnailShape');
    thisScene.rockmanShape = thisScene.cache.json.get('rockmanShape');
    thisScene.wormHeadShape = thisScene.cache.json.get('wormHeadShape');
    thisScene.robotShape = thisScene.cache.json.get("robotShape");
    thisScene.robotMortarShape = thisScene.cache.json.get('robotMortarShape');
}

function createAnimations(thisScene) {
    thisScene.anims.create({
        key: "explodeAnim",
        frames: thisScene.anims.generateFrameNumbers("explosion1"),
        frameRate: 60,
        repeat: 0,
        hideOnComplete: true
    });

    thisScene.anims.create({
        key: "nukeAnim",
        frames: thisScene.anims.generateFrameNumbers("nukeExplosion"),
        frameRate: 60,
        repeat: 0,
        hideOnComplete: true
    });

    thisScene.anims.create({
        key: "lavaAnim",
        frames: thisScene.anims.generateFrameNumbers("lava"),
        frameRate: 20,
        repeat: -1,
    });

    thisScene.anims.create({
        key: "thrustAnim",
        frames: thisScene.anims.generateFrameNumbers("engineThrust"),
        frameRate: 60,
        repeat: -1
    })

    thisScene.anims.create({
        key: "drillAnim",
        frames: thisScene.anims.generateFrameNumbers("drill"),
        frameRate: 10,
        repeat: -1
    });

    thisScene.anims.create({
        key: "diamondAnim",
        frames: thisScene.anims.generateFrameNumbers('diamondPickup'),
        frameRate: 9,
        repeat: -1
    });

    thisScene.anims.create({
        key: 'sparkleAnim',
        frames: thisScene.anims.generateFrameNumbers('sparkle'),
        frameRate: 21,
        repeat: -1
    });

    thisScene.anims.create({
        key: 'airBurstAnim',
        frames: thisScene.anims.generateFrameNumbers('airBurst', { start: 0, end: 44}),
        frame: 60,
        repeat: -1
    });

    thisScene.anims.create({
        key: 'airBurstLeftAnim',
        frames: thisScene.anims.generateFrameNumbers('airBurstLeft', { start: 0, end: 44}),
        frame: 60,
        repeat: -1
    });

    thisScene.anims.create({
        key: 'fireStreamAnim',
        frames: thisScene.anims.generateFrameNumbers('fireStream', { start: 0, end: 29}),
        frame: 60,
        repeat: -1
    });

    thisScene.anims.create({
        key: 'fireBallAnim',
        frames: thisScene.anims.generateFrameNumbers('fireBall', { start: 0, end: 29}),
        frame: 60,
        repeat: -1
    });
}

function createLander(thisScene, xx, yy, mass, thrust, maxHealth, maxFuel, bombs, score, diamonds) {
    let landerShape = thisScene.cache.json.get('landerShape');
    thisScene.lander = new Lander({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        shapeObject: { "shape": landerShape["lander2-flipped"] },
        mass: mass,
        thrust: thrust,
        maxHealth: maxHealth,
        maxFuel: maxFuel,
        bombs: bombs,
        score: score,
        diamonds: diamonds
    });
}

function inputEvents(thisScene) {
    thisScene.cursors = thisScene.input.keyboard.createCursorKeys();
    thisScene.wasd = thisScene.input.keyboard.addKeys(
        {
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'Q': Phaser.Input.Keyboard.KeyCodes.Q,
            'E': Phaser.Input.Keyboard.KeyCodes.E,
            "space": Phaser.Input.Keyboard.KeyCodes.SPACE,
            "tilde": Phaser.Input.Keyboard.KeyCodes.TILDE,
            'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
            "tab": Phaser.Input.Keyboard.KeyCodes.TAB,
            'ctrl': Phaser.Input.Keyboard.KeyCodes.CTRL,
            'alt': Phaser.Input.Keyboard.KeyCodes.ALT,
            'f1': Phaser.Input.Keyboard.KeyCodes.F1,
            'f2': Phaser.Input.Keyboard.KeyCodes.F2,
            'f9': Phaser.Input.Keyboard.KeyCodes.F9,
            'f10': Phaser.Input.Keyboard.KeyCodes.F10,
            'f11': Phaser.Input.Keyboard.KeyCodes.F11,
            'f12': Phaser.Input.Keyboard.KeyCodes.F12
        });

    if (mobile.matches) {
        thisScene.upButton = new Button({
            scene: thisScene,
            x: config.width - 48,
            y: config.height - 60,
            element: 'upButton',
            type: 'up'
        });

        thisScene.downButton = new Button({
            scene: thisScene,
            x: config.width - 48,
            y: config.height - 20,
            element: 'downButton',
            type: 'down'
        });

        thisScene.leftButton = new Button({
            scene: thisScene,
            x: 24,
            y: config.height - 40,
            element: 'leftButton',
            type: 'left'
        });

        thisScene.rightButton = new Button({
            scene: thisScene,
            x: 72,
            y: config.height - 40,
            element: 'rightButton',
            type: 'right'
        });


        let xx;
        if (mobileSmall.matches) {
            xx = [config.width / 2, config.width / 2 - 44, config.width / 2 + 44];
            yy = config.height - 58;
        } else {
            xx = [184, 144, config.width - 136];
            yy = config.height - 42;
        }

        thisScene.bombButton = new Button({
            scene: thisScene,
            x: xx[0],
            y: config.height - 22,
            element: 'bombButton',
            type: 'bomb'
        });

        thisScene.typeButton = new Button ({
            scene: thisScene,
            x: xx[1],
            y: config.height - 58,
            element: 'typeButton',
            type: 'type'
        });

        thisScene.pauseButton = new Button ({
            scene: thisScene,
            x: xx[2],
            y: yy,
            element: 'pauseButton',
            type: 'pause'
        });

        // thisScene.upButton = thisScene.add.image(config.width - 64, config.height - 128, 'upButton').setDepth(10);
        // thisScene.upButton.setInteractive();
        // thisScene.upButton.on('pointerdown', function() {
        //     moveUP(thisScene);
        // });

        // var pointer = scene.input.activePointer;
        // if (pointer.isDown) {
        //     var touchX = pointer.x;
        //     var touchY = pointer.y;
        // }
    } else {
        thisScene.upButton = { isDown: false };
        thisScene.downButton = { isDown: false };
        thisScene.leftButton = { isDown: false };
        thisScene.rightButton = { isDown: false };
    }
}


function createGUI(thisScene) {
    let fontSize = 16;
    if (mobile.matches) {
        fontSize = 12;
    }

    if (mobile.matches) {
        thisScene.add.image(config.width / 2, 32, 'mobileGuiFrame').setScrollFactor(0).setDepth(9);
        thisScene.add.image(config.width / 2 + 12, 32, 'diamond').setScrollFactor(0).setDepth(10);
        thisScene.bombImageDisplay = thisScene.add.image(config.width / 2 + 100, 32, 'smallBomb').setScrollFactor(0).setDepth(10);
        thisScene.integrityDisplay = thisScene.add.bitmapText(20, 13, "fontPressStart", "H: 0 / 0", fontSize).setScrollFactor(0).setDepth(10);
        thisScene.fuelDisplay = thisScene.add.bitmapText(20, 38, "fontPressStart", "F: 200/200", fontSize).setScrollFactor(0).setDepth(10);
        thisScene.diamondDisplay = thisScene.add.bitmapText(config.width / 2 + 20, 26, 'fontPressStart', ' x 000', fontSize).setScrollFactor(0).setDepth(10);
        thisScene.bombDisplay = thisScene.add.bitmapText(config.width / 2 + 104, 26, 'fontPressStart', ' x 000', fontSize).setScrollFactor(0).setDepth(10);
        thisScene.add.image(config.width / 2, config.height - 40, 'mobileGuiBottomFrame').setScrollFactor(0).setDepth(9);
        if (!mobileSmall.matches) {
            thisScene.timeDisplay = thisScene.add.bitmapText(config.width / 2 - 160, 13, "fontPressStart", "Time: 0:00", fontSize).setScrollFactor(0).setDepth(10);
            thisScene.speedDisplay = thisScene.add.bitmapText(config.width / 2 - 160, 38, "fontPressStart", "Speed: 0", fontSize).setScrollFactor(0).setDepth(10);
            thisScene.scoreDisplay = thisScene.add.bitmapText(config.width - 192, 26, 'fontPressStart', 'Score: 0', fontSize).setScrollFactor(0).setDepth(10);
        }
    } else {
        thisScene.add.image(config.width / 2, 64, 'guiFrame').setScrollFactor(0).setDepth(9);
        thisScene.add.image(600, 32, 'diamond').setScrollFactor(0).setDepth(10);
        thisScene.bombImageDisplay = thisScene.add.image(770, 32, 'smallBomb').setScrollFactor(0).setDepth(10);
        thisScene.integrityDisplay = thisScene.add.bitmapText(20, 13, "fontPressStart", "Hull: 0/0", fontSize).setScrollFactor(0).setDepth(10);
        thisScene.fuelDisplay = thisScene.add.bitmapText(20, 38, "fontPressStart", "Fuel: 200 / 200", fontSize).setScrollFactor(0).setDepth(10);
        thisScene.diamondDisplay = thisScene.add.bitmapText(616, 26, 'fontPressStart', ' x 000', fontSize).setScrollFactor(0).setDepth(10);
        thisScene.bombDisplay = thisScene.add.bitmapText(790, 26, 'fontPressStart', ' x 000', fontSize).setScrollFactor(0).setDepth(10);
        thisScene.timeDisplay = thisScene.add.bitmapText(365, 13, "fontPressStart", "Time: 0:00", fontSize).setScrollFactor(0).setDepth(10);
        thisScene.speedDisplay = thisScene.add.bitmapText(365, 38, "fontPressStart", "Speed: 0", fontSize).setScrollFactor(0).setDepth(10);
        thisScene.scoreDisplay = thisScene.add.bitmapText(930, 26, 'fontPressStart', 'Score: 0', fontSize).setScrollFactor(0).setDepth(10);
    }
}

function placeItemsAndEnemies(thisScene) {

    for (let i = 0; i < thisScene.bombPickupIndex.length; i++) {
        let xx = thisScene.bombPickupIndex[i][0] * 16;
        let yy = thisScene.bombPickupIndex[i][1] * 16;
        createPickup(thisScene, xx, yy, "bombPickup");
    }

    for (let i = 0; i < thisScene.mediumBombPickupIndex.length; i++) {
        let xx = thisScene.mediumBombPickupIndex[i][0] * 16;
        let yy = thisScene.mediumBombPickupIndex[i][1] * 16;
        createPickup(thisScene, xx, yy, "mediumBombPickup");
    }

    for (let i = 0; i < thisScene.largeBombPickupIndex.length; i++) {
        let xx = thisScene.largeBombPickupIndex[i][0] * 16;
        let yy = thisScene.largeBombPickupIndex[i][1] * 16;
        createPickup(thisScene, xx, yy, "largeBombPickup");
    }

    for (let i = 0; i < thisScene.clusterBombPickupIndex.length; i++) {
        let xx = thisScene.clusterBombPickupIndex[i][0] * 16;
        let yy = thisScene.clusterBombPickupIndex[i][1] * 16;
        createPickup(thisScene, xx, yy, "clusterBombPickup");
    }

    for (let i = 0; i < thisScene.fuelPickupIndex.length; i++) {
        let xx = thisScene.fuelPickupIndex[i][0] * 16;
        let yy = thisScene.fuelPickupIndex[i][1] * 16;
        createPickup(thisScene, xx, yy, "fuelPickup");
    }

    for (let i = 0; i < thisScene.repairPickupIndex.length; i++) {
        let xx = thisScene.repairPickupIndex[i][0] * 16;
        let yy = thisScene.repairPickupIndex[i][1] * 16;
        createPickup(thisScene, xx, yy, "repairPickup");
    }

    for (let i = 0; i < thisScene.diamondIndex.length; i++) {
        let xx = thisScene.diamondIndex[i][0] * 16;
        let yy = thisScene.diamondIndex[i][1] * 16;
        createPickup(thisScene, xx, yy, "diamondPickup");
    }

    for (let i = 0; i < thisScene.turretIndex.length; i++) {
        let xx = thisScene.turretIndex[i][0] * 16;
        let yy = thisScene.turretIndex[i][1] * 16;
        createTurret(thisScene, xx, yy);
    }

    for (let i = 0; i < thisScene.lavaSnailIndex.length; i++) {
        let xx = thisScene.lavaSnailIndex[i][0] * 16;
        let yy = thisScene.lavaSnailIndex[i][1] * 16;
        createLavaSnail(thisScene, xx, yy);
    }

    for (let i = 0; i < thisScene.rockmanIndex.length; i++) {
        let xx = thisScene.rockmanIndex[i][0] * 16;
        let yy = thisScene.rockmanIndex[i][1] * 16;
        createRockman(thisScene, xx, yy);
    }

    for (let i = 0; i < thisScene.wormUpIndex.length; i++) {
        let xx = thisScene.wormUpIndex[i][0] * 16;
        let yy = thisScene.wormUpIndex[i][1] * 16;
        createWorm(thisScene, xx, yy, 'up');
    }

    if (thisScene.wormDownIndex != undefined) {
        for (let i = 0; i < thisScene.wormDownIndex.length; i++) {
            let xx = thisScene.wormDownIndex[i][0] * 16;
            let yy = thisScene.wormDownIndex[i][1] * 16;
            createWorm(thisScene, xx, yy, 'down');
        }
    }

    for (let i = 0; i < thisScene.volcanoIndex.length; i++) {
        let xx = thisScene.volcanoIndex[i][0] * 16;
        let yy = thisScene.volcanoIndex[i][1] * 16;
        createVolcano(thisScene, xx, yy);
    }

    if (thisScene.robotIndex != undefined) {
        for (let i = 0; i < thisScene.robotIndex.length; i++) {
            let xx = thisScene.robotIndex[i][0] * 16;
            let yy = thisScene.robotIndex[i][1] * 16;
            createRobot(thisScene, xx, yy);
        }
    }

}

function createPickup(thisScene, xx, yy, type) {

    let quantity;
    let shape = thisScene.pickupShape["pickup"];

    switch(type) {

        case "bombPickup":
            quantity = 3;
            break;

        case "mediumBombPickup":
            quantity = 2;
            break;

        case "largeBombPickup":
            quantity = 1;
            break;

        case 'clusterBombPickup':
            quantity = 1;
            break;

        case "fuelPickup":
            quantity = 50;
            break;

        case "repairPickup":
            quantity = 100;
            break;

        case "diamondPickup":
            quantity = 1;
            shape = thisScene.diamondShape['diamond'];
            break;
    }

    let newPickup = new Pickup({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        element: type,
        shapeObject: { "shape": shape },
        quantity: quantity
    });
}

function createRandomPickups(thisScene, minX, maxX, minY, maxY, num, type) {

    for (let i = 0; i < num; i++) {
        let xx = Phaser.Math.RND.realInRange(minX, maxX);
        let yy = Phaser.Math.RND.realInRange(minY, maxY);
        createPickup(thisScene, xx, yy, type);
    }
}

function createTurret(thisScene, xx, yy) {
    let turret = new Turret({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        shapeObject: { "shape": thisScene.turretBaseShape["turretBase"] },
        reloadTime: 500,
        maxHealth: 500,
        firePower: 85, // lower is stronger
        mortarDamage: 250,
        scoreValue: 25
    });
}

function createLavaSnail(thisScene, xx, yy) {
    let lavaSnail = new LavaSnail({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        element: 'lavaSnail',
        shapeObject: { "shape": thisScene.lavaSnailShape["lavaSnail"] },
        maxHealth: 500,
        scoreValue: 25
    });
}

function createRockman(thisScene, xx, yy) {
    let rockman = new Rockman({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        element: 'rockman',
        shapeObject: { "shape": thisScene.rockmanShape["rockman"] },
        maxHealth: 500,
        scoreValue: 50
    });
}

function createWorm(thisScene, xx, yy, direction) {
    let worm = new Worm({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        element: 'wormHead',
        shapeObject: { "shape": thisScene.wormHeadShape["wormHead"] },
        direction: direction,
        maxHealth: 500,
        scoreValue: 50
    });
}

function createRobot(thisScene, xx, yy) {
    let robot = new Robot({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        shapeObject: { "shape": thisScene.robotShape["robot"] },
        reloadTime: 350,
        maxHealth: 1000,
        firePower: 80, // lower is stronger
        mortarDamage: 300,
        scoreValue: 100
    });
}

function createVolcano(thisScene, xx, yy) {
    let volcano = new Volcano({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: yy,
        eruptRate: 250,
        lavaShape: thisScene.lavaShape["lava"]
    });
}

function addSoundFX(thisScene) {
    thisScene.sndExplosion = thisScene.sound.add('explosion');
    thisScene.sndPickup = thisScene.sound.add('pickup');
    thisScene.sndThrusting = thisScene.sound.add('thrusting');
    thisScene.sndHit = thisScene.sound.add('terrainHit');
    thisScene.sndDrilling = thisScene.sound.add('drilling');
}

function updateGUI(thisScene) {
    let landerSpeed = thisScene.lander.body.speed;
    if (landerSpeed < 0.08) {
        landerSpeed = 0;
    }
    if (mobile.matches) {
        thisScene.integrityDisplay.setText('H: ' + thisScene.lander.health.toFixed(1) + "/" + thisScene.lander.maxHealth);
    } else {
        thisScene.integrityDisplay.setText('Hull: ' + thisScene.lander.health.toFixed(2) + " / " + thisScene.lander.maxHealth);
    }

    let landerFuel = thisScene.lander.fuel;
    if (landerFuel < 0) {
        landerFuel = 0;
    }
    if (mobile.matches) {
        thisScene.fuelDisplay.setText('F: ' + landerFuel.toFixed(1) + '/' + thisScene.lander.maxFuel);
    } else {
        thisScene.fuelDisplay.setText('Fuel: ' + landerFuel.toFixed(2) + ' / ' + thisScene.lander.maxFuel);
    }
    thisScene.diamondDisplay.setText(' x ' + thisScene.lander.diamonds);
    let bombType = thisScene.lander.bombTypes[thisScene.lander.currentBomb].type;
    thisScene.bombImageDisplay.setTexture(bombType);
    if (bombType == 'largeBomb') {
        thisScene.bombImageDisplay.setScale(0.5);
    } else {
        thisScene.bombImageDisplay.setScale(1);
    }
    thisScene.bombDisplay.setText(' x ' + thisScene.lander.bombTypes[thisScene.lander.currentBomb].quantity);
    if (!mobile.matches || !mobileSmall.matches) {
        thisScene.speedDisplay.setText('Speed: ' + landerSpeed.toFixed(2));
        thisScene.timeDisplay.setText('Time: ' + thisScene.timeMinutes.toString().padStart(2, '0') + ":" + thisScene.timeSeconds.toFixed(0).padStart(2, '0'));
        thisScene.scoreDisplay.setText('Score: ' + thisScene.lander.score);
    }
}

function playerControls(thisScene) {
    if ((thisScene.cursors.up.isDown || thisScene.wasd.up.isDown || thisScene.upButton.isDown) && thisScene.lander.fuel > 0) {
        let xForce = Math.cos(thisScene.lander.rotation) * thisScene.lander.thrust;
        let yForce = Math.sin(thisScene.lander.rotation) * thisScene.lander.thrust;
        thisScene.lander.applyForce({x: xForce, y: yForce});
        thisScene.lander.fuel -= thisScene.lander.thrust;
        thisScene.lander.fuelUsed += thisScene.lander.thrust;
        thisScene.lander.thruster.setVisible(true);
        if (soundOn) {
            thisScene.sndThrusting.play();
        }
    } else {
        thisScene.lander.thruster.setVisible(false);
    }

    if (thisScene.cursors.left.isDown || thisScene.wasd.left.isDown) {
        thisScene.lander.rotation -= thisScene.lander.rotationRate;
    }

    if (thisScene.cursors.right.isDown || thisScene.wasd.right.isDown) {
        thisScene.lander.rotation += thisScene.lander.rotationRate;
    }

    if ((thisScene.cursors.down.isDown || thisScene.wasd.down.isDown || thisScene.downButton.isDown) && thisScene.lander.fuel > 0) {
        thisScene.lander.drill.setVisible(true);
        thisScene.lander.drilling = true;
        thisScene.lander.fuel -= thisScene.lander.thrust * 3;
        thisScene.lander.fuelUsed += thisScene.lander.thrust * 3;
        if (soundOn) {
            thisScene.sndDrilling.play();
        }
    } else {
        thisScene.lander.drill.setVisible(false);
        thisScene.lander.drilling = false;
    }

    if (thisScene.wasd.Q.isDown || thisScene.leftButton.isDown) {
        thisScene.lander.rotation -= thisScene.lander.rotationRate * 10;
        if (thisScene.lander.rotation < -Math.PI) {
            thisScene.lander.rotation = 0;
        }
    }

    if (thisScene.wasd.E.isDown || thisScene.rightButton.isDown) {
        thisScene.lander.rotation += thisScene.lander.rotationRate * 10;
        if (thisScene.lander.rotation > Math.PI) {
            thisScene.lander.rotation = 0;
        }
    }

    // if (thisScene.cursors.right.isDown || thisScene.wasd.right.isDown || thisScene.wasd.E.isDown) {
    //     thisScene.lander.airBurstLeft.setVisible(true);
    // } else {
    //     thisScene.lander.airBurstLeft.setVisible(false);
    // }

    // if (thisScene.cursors.left.isDown || thisScene.wasd.left.isDown || thisScene.wasd.Q.isDown) {
    //     thisScene.lander.airBurstRight.setVisible(true);
    // } else {
    //     thisScene.lander.airBurstRight.setVisible(false);
    // }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.space)) {
        thisScene.lander.dropBomb();
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.f1)) {
        thisScene.scene.launch('pause', thisScene);
        thisScene.levelMusic.pause();
        thisScene.scene.pause();
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.shift)) {
        thisScene.lander.currentBomb--;
        if (thisScene.lander.currentBomb < 0) {
            thisScene.lander.currentBomb = thisScene.lander.bombTypes.length - 1;
        }
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.tab)) {
        thisScene.lander.currentBomb++;
        if (thisScene.lander.currentBomb > thisScene.lander.bombTypes.length - 1) {
            thisScene.lander.currentBomb = 0;
        }
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.f2)) {
        if (thisScene.scale.isFullscreen) {
            thisScene.scale.stopFullscreen();
            // On stop full screen
        } else {
            thisScene.scale.startFullscreen();
            // On start full screen
        }
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.f9)) {
        thisScene.levelOver = true;
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.f10)) {
        thisScene.lander.diamonds++;
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.f11)) {
        thisScene.lander.maxHealth += 100;
        thisScene.lander.health += 100;
    }

    if (Phaser.Input.Keyboard.JustDown(thisScene.wasd.f12)) {
        thisScene.lander.maxFuel += 100;
        thisScene.lander.fuel += 100;
    }
}

function updateAllActors(thisScene) {
    for (let i = 0; i < thisScene.actors.length; i++) {
        thisScene.actors[i].update();
    }
}

function dropRandomMeteor(thisScene) {
    let xx = Phaser.Math.Between(64, thisScene.levelWidth - 64);
    let choices = ["meteor64x64", "meteor32x32", "meteor16x16"];
    let index = Phaser.Math.RND.pick([0, 1, 2]);
    let element = choices[index];

    let newMeteor = new Meteor({
        scene: thisScene,
        world: thisScene.matter.world,
        x: xx,
        y: -64,
        meteor: element + ".png",
        shapeObject: { "shape": thisScene.meteorShapes[index][element] }
    });
    let range;
    if (element == choices[0]) {
        range = 1;
    } else if (element == choices[1]) {
        range = 0.1;
    } else {
        range = 0.01;
    }
    let xForce = Phaser.Math.RND.realInRange(-range, range);
    let yForce = Phaser.Math.RND.realInRange(-range, range);
    newMeteor.applyForce({ x: xForce, y: yForce});

}


function removeFromArray(item, array) {

    for( var i = 0; i < array.length; i++){
        if ( array[i] === item) {
            array.splice(i, 1);
        }
    }
}
