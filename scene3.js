class Scene3 extends Phaser.Scene {
    constructor() {
        super("level2");

    }

    init(data) {
        this.remaining = data;
    }

    create() {

        this.add.text(100, 100, "Invasion Successful!");
        this.add.text(100, 125, "Fuel Remaining: " + this.remaining.fuel.toFixed(2));
        this.add.text(100, 150, "Hull Integrity Remaining: " + this.remaining.health.toFixed(2));
        this.add.text(100, 175, "Bombs Remaining: " + this.remaining.bombs);
        this.add.text(100, 250, "Press Enter to Begin Next Level");

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.enter)) {
            alert("enter!");
        }
    }

}
