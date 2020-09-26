class Button extends Phaser.GameObjects.Image
{
    constructor(config)
    {
        super(config.scene, config.x, config.y, config.element, "");
        this.scene = config.scene;
        this.scene.add.existing(this);
        this.setDepth(10);
        this.setScrollFactor(0);

        this.setInteractive();
        this.isDown = false;
        this.type = config.type;

        this.onPressed = null;
        this.onReleased = null;

        this.on('pointerdown', () => {
            switch(this.type) {
                case 'bomb':
                    this.scene.lander.dropBomb();
                    break;

                case 'type':
                    this.scene.lander.currentBomb++;
                    if (this.scene.lander.currentBomb > this.scene.lander.bombTypes.length - 1) {
                        this.scene.lander.currentBomb = 0;
                    }
                    break;

                case 'pause':
                    this.scene.scene.launch('pause');
                    this.scene.scene.pause();
                    break;

                case 'unpause':
                    this.scene.scene.resume(LEVELS[currentLevel]);
                    this.scene.scene.stop();
                    break;

                default:
                    this.isDown = true;
                    break;
            }
        });
        this.on('pointerup', () => { this.pointerUp(); });
        this.on('pointerout', () => { this.pointerUp(); });
    }

    pointerUp()
    {
        this.isDown = false;
        if(this.onReleased != null) this.onReleased();
    }

    update()
    {
        if(this.isDown && this.onPressed != null) this.onPressed();

    }
}
