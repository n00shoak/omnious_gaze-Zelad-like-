class scene_0 extends Phaser.Scene {

    constructor() {
        super("scene_0");
    }

    preload() {this.load.image("acceuil", "assets/texture/acceuil.png");this.load.image("start", "assets/texture/playbuton.png");}

    create() {
        console.log("menu")

        this.screen = this.physics.add.staticGroup();
        this.bout = this.physics.add.staticGroup();

        const A = this.screen.create(950,600, 'acceuil').setScale(0.50,0.50);
        this.B = this.bout.create(950,600, 'start').setScale(4,4);

        this.B.setInteractive();

        this.B.on('pointerdown', () => {

            this.scene.start("scene_1", {
            });

          });
    }

}