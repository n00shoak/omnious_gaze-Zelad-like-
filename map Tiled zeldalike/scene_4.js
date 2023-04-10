class scene_4 extends Phaser.Scene {
    constructor() {
        super("scene_4");
    }

    init(data) {
        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y;

        this.droneUNL = data.UNL;

        this.level2_door = data.__door;
        this.level2_LED_A = data.LED_A;
        this.level2_LED_B = data.LED_B;
    }

    preload() {
        // - - -add object - - -
        this.load.image("bouton", "assets/texture/boutonSprite.png");
        this.load.image("blood", "assets/texture/bloodSprite.png");
        this.load.spritesheet("valve", "assets/texture/valveSprite.png", { frameWidth: 16, frameHeight: 16 });
        this.load.image("bullet", "assets/texture/bulletSprite.png");
        this.load.spritesheet("cam", "assets/texture/droneUi.png", { frameWidth: 16, frameHeight: 16 });
        this.load.image("gun", "assets/texture/GunSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("pchit", "assets/texture/smokeSprite.png", { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("doors", "assets/texture/doorsSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("fatDoors", "assets/texture/fatDoorSprite.png", { frameWidth: 48, frameHeight: 16 });
        this.load.spritesheet("levier", "assets/texture/leverSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("drone", "assets/texture/drone.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("zombie", "assets/texture/zombieSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("health", "assets/texture/healthSprite.png", { frameWidth: 64, frameHeight: 16 });

        // - - - add player - - -
        this.load.spritesheet('character', 'assets/texture/CharacterSprite.png', { frameWidth: 32, frameHeight: 32 });

        // - - - add tilset - - -
        this.load.image("tileset_A", "El pallette.png");

        // - - - add maps - - - 
        this.load.tilemapTiledJSON("map_D", "assets/map/map zelda like 4.json");

        this.hurt = false
    }

    vhsEFFECT(){
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.sprite.setFrame(0)
            },
        })
        this.time.addEvent({
            delay: 200,
            callback: () => {
                this.sprite.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 300,
            callback: () => {
                this.sprite.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 400,
            callback: () => {
                this.sprite.setFrame(3)
                this.vhsEFFECT()
            },
        })

    }

    create() {

        this.vhsEFFECT()

        // - - - inputs - - -
        this.cursors = this.input.keyboard.createCursorKeys();


        //- - - loading map - - -
        const carteDuNiveau = this.add.tilemap("map_D");


        // - - - loading tilset - - - 
        const tilesetA = carteDuNiveau.addTilesetImage(
            "EL pallette",
            "tileset_A"
        );

        const sol_2 = carteDuNiveau.createLayer("sol 2", tilesetA);
        const sol_1 = carteDuNiveau.createLayer("sol 1", tilesetA);
        this.meubles = carteDuNiveau.createLayer("meubles 1", tilesetA);
        this.mur_1 = carteDuNiveau.createLayer("mur 1", tilesetA);

        // - - - loading object - - - 
        this.porte_1 = this.physics.add.staticGroup();
        this.porte_2 = this.physics.add.staticGroup();
        this.porte_3 = this.physics.add.staticGroup();
        this.porte_4 = this.physics.add.staticGroup();
        this.porte_5 = this.physics.add.staticGroup();
        this.porte_6 = this.physics.add.staticGroup();
        this.porte_7 = this.physics.add.staticGroup();
        this.porte_8 = this.physics.add.staticGroup();

        this.bouton_1 = this.physics.add.staticGroup();
        this.bouton_2 = this.physics.add.staticGroup();
        this.bouton_3 = this.physics.add.staticGroup();

        this.exit = this.physics.add.staticGroup();
        this.bullet1 = this.physics.add.group();

        this.ennemis = this.physics.add.group();

        this.room = this.physics.add.group();

        this.blood = this.physics.add.staticGroup();

        this.health = this.physics.add.staticGroup();
        this.soins = this.physics.add.staticGroup();

        carteDuNiveau.getObjectLayer('exit').objects.forEach((variable) => {
            const __exit = this.exit.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(192, 16);
        });

        carteDuNiveau.getObjectLayer('enterTHEROOM').objects.forEach((variable) => {
            const __room = this.room.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(64, 128);
        });

        carteDuNiveau.getObjectLayer('bouton_1').objects.forEach((variable) => {
            const _bouton1 = this.bouton_1.create(variable.x + 8, variable.y + 8, 'bouton');
        });
        carteDuNiveau.getObjectLayer('bouton_2').objects.forEach((variable) => {
            const _bouton2 = this.bouton_2.create(variable.x + 8, variable.y + 8, 'bouton');
        });
        carteDuNiveau.getObjectLayer('bouton_3').objects.forEach((variable) => {
            const _bouton3 = this.bouton_3.create(variable.x + 8, variable.y + 8, 'bouton');
        });

        carteDuNiveau.getObjectLayer('porte_1').objects.forEach((porte) => {
            const porte1 = this.porte_1.create(porte.x + 24, porte.y + 8).setVisible(false).setImmovable(false).setSize(48, 16);
            this.porte1GRPH = this.add.tileSprite(porte.x + 24, porte.y + 8, 48, 16, 'fatDoors', 2);
            this.porte1GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('porte_2').objects.forEach((porte) => {
            const porte2 = this.porte_2.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte2GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte2GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('porte_3').objects.forEach((porte) => {
            const porte3 = this.porte_3.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte3GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte3GRPH.setFrame(0)
            this.porte3GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('porte_4').objects.forEach((porte) => {
            const porte4 = this.porte_4.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte4GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte4GRPH.setFrame(0)
            this.porte4GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('porte_5').objects.forEach((porte) => {
            const porte5 = this.porte_5.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte5GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte5GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('porte_6').objects.forEach((porte) => {
            const porte6 = this.porte_6.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte6GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte6GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('porte_7').objects.forEach((porte) => {
            const porte7 = this.porte_7.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte7GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte7GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('porte_8').objects.forEach((porte) => {
            const porte8 = this.porte_8.create(porte.x + 8, porte.y + 24).setVisible(false).setImmovable(false).setSize(16, 48);
            this.porte8GRPH = this.add.tileSprite(porte.x + 8, porte.y + 24, 48, 16, 'fatDoors', 2);
            this.porte8GRPH.setFrame(7)
            this.porte8GRPH.angle = 90;
        });

        // - - - loading player - - -
        //base sprite
        this.player = this.physics.add.sprite(this.positionX,this.positionY, 'character').setScale(0.75, 0.75);

        // - - - loading ennemis - - - 
        this.en1 = this.physics.add.sprite(300, 350, 'zombie');
        this.ennemis.add(this.en1)
        this.en1.pv = 5
        console.log(this.en1.pv)

        this.en2 = this.physics.add.sprite(700, 350, 'zombie');
        this.ennemis.add(this.en2)
        this.en2.pv = 5
        console.log(this.en2.pv)

        this.en3 = this.physics.add.sprite(800, 850, 'zombie');
        this.ennemis.add(this.en3)
        this.en3.pv = 5
        console.log(this.en3.pv)

        this.en4 = this.physics.add.sprite(750, 900, 'zombie');
        this.ennemis.add(this.en4)
        this.en4.pv = 5
        console.log(this.en4.pv)

        this.en5 = this.physics.add.sprite(770, 975, 'zombie');
        this.ennemis.add(this.en5)
        this.en5.pv = 5
        console.log(this.en5.pv)

        this.en6 = this.physics.add.sprite(1000, 800, 'zombie');
        this.ennemis.add(this.en6)
        this.en6.pv = 5
        console.log(this.en6.pv)

        this.en7 = this.physics.add.sprite(1050, 850, 'zombie');
        this.ennemis.add(this.en7)
        this.en7.pv = 5
        console.log(this.en7.pv)

        this.en8 = this.physics.add.sprite(1075, 975, 'zombie');
        this.ennemis.add(this.en8)
        this.en8.pv = 5
        console.log(this.en8.pv)

        this.en9 = this.physics.add.sprite(1075, 750, 'zombie');
        this.ennemis.add(this.en9)
        this.en9.pv = 5
        console.log(this.en9.pv)

        this.en10 = this.physics.add.sprite(600, 950, 'zombie');
        this.ennemis.add(this.en10)
        this.en10.pv = 5
        console.log(this.en10.pv)

        // - - - loading ui - - -
        this.healthShow = this.add.tileSprite(960, 520, 64, 16, 'health').setScrollFactor(0).setScale(0.5,0.5);
        this.sprite = this.add.tileSprite(960, 620, 1500, 1600, 'cam').setScrollFactor(0).setScale(0.5, 0.5);
        this.gunINV = this.add.tileSprite(710, 620, 32, 32, 'gun').setScrollFactor(0).setScale(1.5,1.5);
        this.droneINV = this.add.tileSprite(710, 580, 16, 16, 'drone').setScrollFactor(0).setScale(1.5,1.5);


        this.sprite.alpha = 0; // Définir l'opacité initiale à 0


        // - - - animations - - - 
        //joueur :
        this.anims.create({
            key: 'moveRight',
            frames: this.anims.generateFrameNumbers('character', { start: 4, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moveLeft',
            frames: this.anims.generateFrameNumbers('character', { start: 20, end: 27 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moveUp',
            frames: this.anims.generateFrameNumbers('character', { start: 12, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moveDown',
            frames: this.anims.generateFrameNumbers('character', { start: 28, end: 36 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'pchitpchit',
            frames: this.anims.generateFrameNumbers('pchit', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'RAN',
            frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        // - - - collider - - -
        this.mur_1.setCollisionByProperty({ estSolide: true });
        this.meubles.setCollisionByProperty({ estSolide: true });
        //this.physics.add.collider(this.player, this.mur_1);
        this.physics.add.collider(this.player, this.meubles);

        this.porte_A = this.physics.add.collider(this.player, this.porte_1)
        this.porte_B = this.physics.add.collider(this.player, this.porte_2)
        this.porte_C = this.physics.add.collider(this.player, this.porte_3)
        this.porte_D = this.physics.add.collider(this.player, this.porte_4)
        this.porte_E = this.physics.add.collider(this.player, this.porte_5)
        this.porte_F = this.physics.add.collider(this.player, this.porte_6)
        this.porte_G = this.physics.add.collider(this.player, this.porte_7)
        this.porte_H = this.physics.add.collider(this.player, this.porte_8)

        this.physics.add.overlap(this.player, this.bouton_1, this.activation_3, null, this)
        this.physics.add.overlap(this.player, this.bouton_2, this.activation_1, null, this)
        this.physics.add.overlap(this.player, this.bouton_3, this.activation_2, null, this)

        this.physics.add.overlap(this.player, this.room, this.enterTHEROOM, null, this)

        this.physics.add.overlap(this.player, this.exit, this.OUT, null, this)

        //colision ennemi >> player
        this.physics.add.overlap(this.ennemis, this.player, this.takeDamage, null, this)

        //colision ennemi >> bullet
        this.physics.add.overlap(this.ennemis, this.bullet1, this.killEn, null, this)

        //cam
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);

        this.KeyB;
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)

        this.getDrone = true
        this.dronemode = false
        this.speed = 200

        this.playerPV = 4
    }

    update() {

        
        //set health
        if (this.playerPV == 4) {
            this.healthShow.setFrame(0)
        }
        if (this.playerPV == 3) {
            this.healthShow.setFrame(1)
        }
        if (this.playerPV == 2) {
            this.healthShow.setFrame(2)
        }
        if (this.playerPV == 1) {
            this.healthShow.setFrame(3)
        }


        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.getDrone == true) {
            if (this.dronemode == false) {
                this.dronemode = true
                console.log("drone mode", this.dronemode)

                this.tweens.add({
                    targets: this.sprite,
                    alpha: 1,
                    duration: 250,
                    ease: 'Linear',
                    yoyo: false,
                    repeat: 0
                });

                this.healthShow.setVisible(false)

                this.drone = this.physics.add.sprite(this.player.x, this.player.y, 'drone').setScale(0.5, 0.5);

                this.cameras.main.startFollow(this.drone);
                this.cameras.main.setZoom(5);

                this.physics.add.overlap(this.drone, this.bouton_1, this.activation_1, null, this)
                this.physics.add.overlap(this.drone, this.bouton_2, this.activation_2, null, this)
                this.physics.add.overlap(this.drone, this.bouton_3, this.activation_3, null, this)
                
                this.physics.add.overlap(this.player, this.soins, this.heal, null, this)

                this.player.setVelocityY(0);
                this.player.setVelocityX(0);

                this.physics.add.collider(this.drone, this.mur_1);
                this.physics.add.collider(this.drone, this.meubles);

                this.speed = 100

                this.time.addEvent({
                    delay: 4000,
                    callback: () => {
                        this.drone.setFrame(1)
                    },
                })
                this.time.addEvent({
                    delay: 4500,
                    callback: () => {
                        this.drone.setFrame(0)
                    },
                })
                this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        this.drone.setFrame(1)
                    },
                })
                this.time.addEvent({
                    delay: 5500,
                    callback: () => {
                        this.drone.setFrame(0)
                    },
                })
                this.time.addEvent({
                    delay: 6000,
                    callback: () => {
                        this.drone.setFrame(1)
                    },
                })
                this.time.addEvent({
                    delay: 6250,
                    callback: () => {
                        this.drone.setFrame(0)
                    },
                })
                this.time.addEvent({
                    delay: 6500,
                    callback: () => {
                        this.drone.setFrame(1)
                    },
                })
                this.time.addEvent({
                    delay: 6750,
                    callback: () => {
                        this.drone.setFrame(0)
                    },
                })
                this.time.addEvent({
                    delay: 7000,
                    callback: () => {
                        this.speed = 200

                        this.tweens.add({
                            targets: this.sprite,
                            alpha: 0,
                            duration: 250,
                            ease: 'Linear',
                            yoyo: false,
                            repeat: 0
                        });

                        this.dronemode = false
                        console.log("drone mode", this.dronemode)
                        this.drone.destroy()
                        this.cameras.main.startFollow(this.player);
                        this.cameras.main.setZoom(3.5);

                        this.healthShow.setVisible(true)
                    },
                })
            }

        }

        if (this.dronemode == false) {
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-1);
                this.player.anims.play('moveUp', true);
                this.direction = "up"
            }
            if (this.cursors.down.isDown) {
                this.player.setVelocityY(1);
                this.player.anims.play('moveDown', true);
                this.direction = "down"
            }
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-1);
                this.player.anims.play('moveLeft', true);
                this.direction = "left"
            }
            if (this.cursors.right.isDown) {
                this.player.setVelocityX(1);
                this.player.anims.play('moveRight', true);
                this.direction = "right"
            }

            if (this.cursors.up.isUp && this.cursors.down.isUp && this.hurt == false) {
                this.player.setVelocityY(0);
            }

            if (this.cursors.left.isUp && this.cursors.right.isUp && this.hurt == false) {
                this.player.setVelocityX(0);
            }
        }
        else {
            console.log("drone mode")

            if (this.cursors.up.isDown) {
                this.drone.setVelocityY(-1);
            }
            if (this.cursors.down.isDown) {
                this.drone.setVelocityY(1);
            }
            if (this.cursors.left.isDown) {
                this.drone.setVelocityX(-1);
            }
            if (this.cursors.right.isDown) {
                this.drone.setVelocityX(1);
            }

            if (this.cursors.up.isUp && this.cursors.down.isUp) {
                this.drone.setVelocityY(0);
            }

            if (this.cursors.left.isUp && this.cursors.right.isUp) {
                this.drone.setVelocityX(0);
            }

            this.drone.body.velocity.normalize().scale(this.speed);
        }

        this.player.body.velocity.normalize().scale(this.speed);

        //idle
        if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp) {
            this.player.anims.play('moveUp', false);
            this.player.anims.play('moveDown', false);
            this.player.anims.play('moveLeft', false);
            this.player.anims.play('moveRight', false);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyB)) {
            console.log("piou")

            if (this.direction == "down") {
                this.bullet_1 = this.bullet1.create(this.player.x, this.player.y, 'bullet').setScale(0.5, 0.5).setVelocityY(500).rotation = 3.1;
            }
            if (this.direction == "up") {
                this.bullet_1 = this.bullet1.create(this.player.x, this.player.y, 'bullet').setScale(0.5, 0.5).setVelocityY(-500);
            }
            if (this.direction == "right") {
                this.bullet_1 = this.bullet1.create(this.player.x, this.player.y, 'bullet').setScale(0.5, 0.5).setVelocityX(500).rotation = 1.55;
            }
            if (this.direction == "left") {
                this.bullet_1 = this.bullet1.create(this.player.x, this.player.y, 'bullet').setScale(0.5, 0.5).setVelocityX(-500).rotation = -1.55;
            }

            this.physics.add.collider(this.bullet1, this.mur_1, this.killbullet, null, this);
            this.mur_1.setCollisionByProperty({ estSolide: true });
        }

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en1.x, this.en1.y) < 200) && this.en1.pv > 0) { this.zomb(this.en1) }
        else if (this.en1.pv > 0) (this.en1.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en2.x, this.en2.y) < 200) && this.en2.pv > 0) { this.zomb(this.en2) }
        else if (this.en2.pv > 0) (this.en2.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en3.x, this.en3.y) < 200) && this.en3.pv > 0) { this.zomb(this.en3) }
        else if (this.en3.pv > 0) (this.en3.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en4.x, this.en4.y) < 200) && this.en4.pv > 0) { this.zomb(this.en4) }
        else if (this.en4.pv > 0) (this.en4.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en5.x, this.en5.y) < 200) && this.en5.pv > 0) { this.zomb(this.en5) }
        else if (this.en5.pv > 0) (this.en5.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en6.x, this.en6.y) < 200) && this.en6.pv > 0) { this.zomb(this.en6) }
        else if (this.en6.pv > 0) (this.en6.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en7.x, this.en7.y) < 200) && this.en7.pv > 0) { this.zomb(this.en7) }
        else if (this.en7.pv > 0) (this.en7.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en8.x, this.en8.y) < 200) && this.en8.pv > 0) { this.zomb(this.en8) }
        else if (this.en8.pv > 0) (this.en8.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en9.x, this.en9.y) < 200) && this.en9.pv > 0) { this.zomb(this.en9) }
        else if (this.en9.pv > 0) (this.en9.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en10.x, this.en10.y) < 200) && this.en10.pv > 0) { this.zomb(this.en10) }
        else if (this.en10.pv > 0) (this.en10.setVelocityX(0).setVelocityY(0))
    }

    killbullet(bullet1){
        bullet1.destroy()
    }

    larva(en) {
        var angle = Phaser.Math.Angle.Between(en.x, en.y, this.player.x, this.player.y);
        en.rotation = angle
        en.anims.play('gigote', true)
        this.physics.moveToObject(en, this.player, 50);
    }

    zomb(en) {
        console.log("zombie moving")
        var angle = Phaser.Math.Angle.Between(en.x, en.y, this.player.x, this.player.y);
        en.rotation = angle
        en.anims.play('RAN', true)
        this.physics.moveToObject(en, this.player, 50);
    }

    heal(pl ,soins){
        if(this.playerPV < 4){this.playerPV += 1}
        soins.destroy()
    }

    takeDamage(en, pl) {
        if (this.hurt == false) {
            this.playerPV -= 1
            this.hurt = true
            this.time.addEvent({
                delay: 150,
                callback: () => {
                    this.playerPV += 1
                },
            })
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.playerPV -= 1
                },
            })
            this.time.addEvent({
                delay: 450,
                callback: () => {
                    this.playerPV += 1
                },
            })
            this.time.addEvent({
                delay: 600,
                callback: () => {
                    this.playerPV -= 1
                },
            })


            if (en.body.touching.left) {
                this.player.setVelocityX(600);
                console.log("hurt left")
            }
            if (en.body.touching.right) {
                this.player.setVelocityX(-600);
                console.log("hurt left")
            }
            if (en.body.touching.up) {
                this.player.setVelocityY(600);
                console.log("hurt left")
            }
            if (en.body.touching.down) {
                this.player.setVelocityY(-600);
                console.log("hurt left")
            }

            //recoil
            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.hurt = false
                },
            })

            //feed back
            this.player.setVisible(false)
            this.time.addEvent({
                delay: 50,
                callback: () => {
                    this.player.setVisible(true)
                },
            })
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.player.setVisible(false)
                },
            })
            this.time.addEvent({
                delay: 150,
                callback: () => {
                    this.player.setVisible(true)
                },
            })
        }

    }

    killEn(en, bul) {
        bul.destroy()
        en.pv -= 1
        console.log(en.pv)

        this.bullet_1 = this.blood.create(en.body.x + 8, en.body.y + 8, 'blood').setScale(0.3, 0.3).setAlpha(Phaser.Math.Between(0.1, 0.9)).rotation = Phaser.Math.Between(0.1, 6.2);

        this.time.addEvent({
            delay: 50,
            callback: () => {
                en.setVisible(true)
            },
        })
        this.time.addEvent({
            delay: 100,
            callback: () => {
                en.setVisible(false)
            },
        })
        this.time.addEvent({
            delay: 150,
            callback: () => {
                en.setVisible(true)
            },
        })

        if (en.pv <= 0) {
            this.bullet_1 = this.blood.create(en.body.x, en.body.y, 'blood').setScale(1, 1).rotation = Phaser.Math.Between(0.1, 6.2);

            if( Phaser.Math.Between(1, 3) == 1){this.soins.create(en.body.x,en.body.y, 'soins').setScale(1,1);}

            en.destroy()
        }
    }

    activation_1() {
        console.log("bouton 1")
        //activate the door
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.porte1GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 2400,
            callback: () => {
                this.porte1GRPH.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 2800,
            callback: () => {
                this.porte1GRPH.setFrame(3)
            },
        })
        this.time.addEvent({
            delay: 3200,
            callback: () => {
                this.porte1GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_A)
            },
        })
    }

    activation_2() {
        console.log("bouton 2")

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte2GRPH.setFrame(1)
            },
        })

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.porte2GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_B)
            },
        })
    }

    enterTHEROOM() {
        this.room.setVelocityX(-600)
        this.time.addEvent({
            delay: 5500,
            callback: () => {
                this.porte2GRPH.setFrame(1)
                this.porte3GRPH.setFrame(1)
                this.porte4GRPH.setFrame(1)
                this.porte5GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 6000,
            callback: () => {
                this.porte2GRPH.setVisible(false);
                this.porte3GRPH.setVisible(false);
                this.porte4GRPH.setVisible(false);
                this.porte5GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_B)
                this.physics.world.removeCollider(this.porte_C)
                this.physics.world.removeCollider(this.porte_D)
                this.physics.world.removeCollider(this.porte_E)
            },
        })

    }

    activation_3(){
        console.log("bouton 3")
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte6GRPH.setFrame(1)
                this.porte7GRPH.setFrame(1)

            },
        })
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.porte6GRPH.setVisible(false);
                this.porte7GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_F)
                this.physics.world.removeCollider(this.porte_G)
 
            },
        })
    }

    OUT(){
        this.positionX = 1380;
        this.positionY = 1564;
        this.level2_door = true;
        this.droneUNL = true;

        this.scene.start("scene_2", {
            x: this.positionX,
            y: this.positionY,
            __door: this.level2_door,
            UNL: this.droneUNL,
            LED_A:this.level2_LED_A,
        });
    }
}