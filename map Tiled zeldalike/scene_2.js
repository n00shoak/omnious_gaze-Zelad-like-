class scene_2 extends Phaser.Scene {
    constructor() {
        super("scene_2");
    }

    init(data) {
        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y;

        this.droneUNL = data.UNL;

        this.level2_door = data.__door
        this.level2_LED_A = data.LED_A
        this.level2_LED_B = data.LED_B
    }

    preload() {

        // - - - load music - - - 
        this.load.audio('fightMusic', 'assets/fightTheme.mp3');

        // - - - load var - - -
        this.ouvert1 = false

        // - - -add object - - -
        this.load.image("bouton", "assets/texture/boutonSprite.png");
        this.load.image("gun", "assets/texture/GunSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("bullet", "assets/texture/bulletSprite.png");
        this.load.image("blood", "assets/texture/bloodSprite.png");
        this.load.image("texteB", "assets/texture/texteB.png");
        this.load.image("texteD", "assets/texture/texteD.png");
        this.load.image("texteE", "assets/texture/texteE.png");
        this.load.spritesheet("cam", "assets/texture/droneUi.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("doors", "assets/texture/doorsSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("fatDoors", "assets/texture/fatDoorSprite.png", { frameWidth: 48, frameHeight: 16 });
        this.load.spritesheet("levier", "assets/texture/leverSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("LED", "assets/texture/LEDSPRITE.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("drone", "assets/texture/drone.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("zombie", "assets/texture/zombieSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("larve", "assets/texture/ennemiSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("pont", "assets/texture/pontSprite.png");
        this.load.spritesheet("health", "assets/texture/healthSprite.png", { frameWidth: 64, frameHeight: 16 });

        // - - - add player - - -
        this.load.spritesheet('character', 'assets/texture/CharacterSprite.png', { frameWidth: 32, frameHeight: 32 });

        // - - - add tilset - - -
        this.load.image("tileset_A", "El pallette.png");

        // - - - add maps - - - 
        this.load.tilemapTiledJSON("map_B", "assets/map/map zelda like .2.json");

        this.hurt = false

    }

    activation_3() {

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte2GRPH.setFrame(1)
                this.porte3GRPH.setFrame(1)
                this.porte4GRPH.setFrame(1)
                this.porte5GRPH.setFrame(1)
                this.porte6GRPH.setFrame(1)
                this.porte7GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.porte2GRPH.setVisible(false);
                this.porte3GRPH.setVisible(false);
                this.porte4GRPH.setVisible(false);
                this.porte5GRPH.setVisible(false);
                this.porte6GRPH.setVisible(false);
                this.porte7GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_B)
                this.physics.world.removeCollider(this.porte_C)
                this.physics.world.removeCollider(this.porte_D)
                this.physics.world.removeCollider(this.porte_E)
                this.physics.world.removeCollider(this.porte_F)
                this.physics.world.removeCollider(this.porte_G)
            },
        })
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

    // =============================================
    //               CREATE FONCTION
    // =============================================

    create() {
        this.vhsEFFECT()

        // - - - loading music - - -
        this.fightMusic = this.sound.add('fightMusic');

        // - - - inputs - - -
        this.cursors = this.input.keyboard.createCursorKeys();


        //- - - loading map - - -
        const carteDuNiveau = this.add.tilemap("map_B");


        // - - - loading tilset - - - 
        const tilesetA = carteDuNiveau.addTilesetImage(
            "EL pallette",
            "tileset_A"
        );


        // - - - loading layers - - -
        const sol_1 = carteDuNiveau.createLayer("sol 3", tilesetA);
        const sol_2 = carteDuNiveau.createLayer("sol 2", tilesetA);
        const sol_3 = carteDuNiveau.createLayer("sol 1", tilesetA);
        this.meubles_1 = carteDuNiveau.createLayer("meubles 1", tilesetA);
        this.meubles_2 = carteDuNiveau.createLayer("meubles 2", tilesetA);
        this.mur_1 = carteDuNiveau.createLayer("mur 1", tilesetA);



        // - - - loading object - - -
        this.bouton1 = this.physics.add.group({ allowGravity: false, imovable: true });
        this.bouton2 = this.physics.add.group({ allowGravity: false, imovable: true });


        this.portes1 = this.physics.add.staticGroup();
        this.portes2 = this.physics.add.staticGroup();
        this.portes3 = this.physics.add.staticGroup();
        this.portes4 = this.physics.add.staticGroup();
        this.portes5 = this.physics.add.staticGroup();
        this.portes6 = this.physics.add.staticGroup();
        this.portes7 = this.physics.add.staticGroup();
        this.portes8 = this.physics.add.staticGroup();
        this.portes9 = this.physics.add.staticGroup();
        this.portes10 = this.physics.add.staticGroup();
        this.portes11 = this.physics.add.staticGroup();
        this.portes12 = this.physics.add.staticGroup();
        this.portes13 = this.physics.add.staticGroup();

        this.exit1 = this.physics.add.staticGroup();
        this.exit2 = this.physics.add.staticGroup();

        this.core = this.physics.add.staticGroup();

        this.RoomStarter = this.physics.add.group({ allowGravity: false, imovable: true });

        this.ennemis = this.physics.add.group();

        this.core = this.physics.add.group();

        this.bullet1 = this.physics.add.group();

        this.pont = this.physics.add.staticGroup();

        this.blood = this.physics.add.staticGroup();

        this.health = this.physics.add.staticGroup();
        this.soins = this.physics.add.staticGroup();


        this.levier1 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });

        this.levier2 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });

        this.LED_1 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });

        this.LED_2 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });


        carteDuNiveau.getObjectLayer('pont').objects.forEach((variable) => {
            const lePONT = this.pont.create(variable.x, variable.y, 'pont').setSize(288, 64).setVisible(false);
        });

        carteDuNiveau.getObjectLayer('core').objects.forEach((variable) => {
            const leCORE = this.core.create(variable.x, variable.y).setSize(64, 64).setVisible(false);
        });

        carteDuNiveau.getObjectLayer('light_1').objects.forEach((variable) => {
            const LED_1 = this.LED_1.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(16, 16);
            this.light1GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'LED', 2);
            this.light1GRPH.setFrame(0);
        });

        carteDuNiveau.getObjectLayer('light_2').objects.forEach((variable) => {
            const LED_2 = this.LED_2.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(16, 16);
            this.light2GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'LED', 2);
            this.light2GRPH.setFrame(0);
        });

        carteDuNiveau.getObjectLayer('enterTHEROOM').objects.forEach((porte) => {
            const room = this.RoomStarter.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(64, 128);
        });

        carteDuNiveau.getObjectLayer('porte_1').objects.forEach((porte) => {
            const porte_1 = this.portes1.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte1GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte1GRPH.setFrame(0)
            this.porte1GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('porte_2').objects.forEach((porte) => {
            const porte_2 = this.portes2.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte2GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte2GRPH.setFrame(0)
        })
        carteDuNiveau.getObjectLayer('porte_3').objects.forEach((porte) => {
            const porte_3 = this.portes3.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte3GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte3GRPH.setFrame(0)
        })
        carteDuNiveau.getObjectLayer('porte_4').objects.forEach((porte) => {
            const porte_4 = this.portes4.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte4GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte4GRPH.setFrame(0)
        })
        carteDuNiveau.getObjectLayer('porte_5').objects.forEach((porte) => {
            const porte_5 = this.portes5.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte5GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte5GRPH.setFrame(0)
        })
        carteDuNiveau.getObjectLayer('porte_6').objects.forEach((porte) => {
            const porte_6 = this.portes6.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte6GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte6GRPH.setFrame(0)
            this.porte6GRPH.angle = 90;
        })
        carteDuNiveau.getObjectLayer('porte_7').objects.forEach((porte) => {
            const porte_7 = this.portes7.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte7GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte7GRPH.setFrame(0)
            this.porte7GRPH.angle = 90;
        })
        carteDuNiveau.getObjectLayer('porte_8').objects.forEach((porte) => {
            const porte_8 = this.portes8.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte8GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte8GRPH.setFrame(0)
            this.porte8GRPH.angle = 90;
        })
        carteDuNiveau.getObjectLayer('porte_9').objects.forEach((porte) => {
            const porte_9 = this.portes9.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte9GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte9GRPH.setFrame(0)
            this.porte9GRPH.angle = 90;
        })
        carteDuNiveau.getObjectLayer('porte_10').objects.forEach((porte) => {
            const porte_10 = this.portes10.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte10GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte10GRPH.setFrame(0)
            this.porte10GRPH.angle = 90;
        })
        carteDuNiveau.getObjectLayer('porte_11').objects.forEach((porte) => {
            const porte_11 = this.portes11.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte11GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte11GRPH.setFrame(0)
            this.porte11GRPH.angle = 90;
        })
        carteDuNiveau.getObjectLayer('porte_12').objects.forEach((porte) => {
            const porte_12 = this.portes12.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte12GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte12GRPH.setFrame(0)
            this.porte12GRPH.angle = 90;
        })
        carteDuNiveau.getObjectLayer('porte_13').objects.forEach((porte) => {
            const porte_13 = this.portes13.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte13GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte13GRPH.setFrame(0)
        })

        carteDuNiveau.getObjectLayer('tolevel_3').objects.forEach((out) => {
            const _exit1 = this.exit1.create(out.x + 8, out.y).setVisible(false).setImmovable(false).setSize(64, 16);
        });

        carteDuNiveau.getObjectLayer('tolevel_4').objects.forEach((out) => {
            const _exit2 = this.exit2.create(out.x, out.y).setVisible(false).setImmovable(false).setSize(64, 16);
        });

        carteDuNiveau.getObjectLayer('bouton_1').objects.forEach((bouton) => {
            const bouton_1 = this.bouton1.create(bouton.x + 8, bouton.y + 8, 'bouton');
        });

        carteDuNiveau.getObjectLayer('bouton_2').objects.forEach((bouton) => {
            const bouton_2 = this.bouton2.create(bouton.x + 8, bouton.y + 8, 'bouton');
        });

        carteDuNiveau.getObjectLayer('levier_1').objects.forEach((levier) => {
            const levier_1 = this.levier1.create(levier.x + 16, levier.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.levier1GRPH = this.add.tileSprite(levier.x + 16, levier.y + 8, 32, 16, 'levier', 2);
        });

        carteDuNiveau.getObjectLayer('levier_2').objects.forEach((levier) => {
            const levier_2 = this.levier2.create(levier.x + 16, levier.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.levier2GRPH = this.add.tileSprite(levier.x + 16, levier.y + 8, 32, 16, 'levier', 2);
        });


        // - - - loading player - - -
        //base sprite
        this.player = this.physics.add.sprite(this.positionX, this.positionY, 'character').setScale(0.65, 0.65);

        // - - - loading ui - - -
        this.healthShow = this.add.tileSprite(960, 520, 64, 16, 'health').setScrollFactor(0).setScale(0.5, 0.5);
        this.sprite = this.add.tileSprite(960, 620, 1500, 1600, 'cam').setScrollFactor(0).setScale(0.5, 0.5);
        this.texte = this.add.tileSprite(960, 620, 320, 64, 'texteB').setScrollFactor(0).setScale(0.5,0.5);
        this.texteD = this.add.tileSprite(960, 620, 320, 64, 'texteD').setScrollFactor(0).setScale(0.5,0.5);
        this.texteE = this.add.tileSprite(960, 620, 320, 64, 'texteE').setScrollFactor(0).setScale(0.5,0.5);
        this.gunINV = this.add.tileSprite(710, 620, 32, 32, 'gun').setScrollFactor(0).setScale(1.5,1.5);
        this.droneINV = this.add.tileSprite(710, 580, 16, 16, 'drone').setScrollFactor(0).setScale(1.5,1.5);


        this.sprite.alpha = 0; // Définir l'opacité initiale à 0
        this.texte.alpha = 0;
        this.texteD.alpha = 0;
        this.texteE.alpha = 0;
        this.droneINV.alpha = 0;

        // - - - loading ennemis - - - 
        this.en1 = this.physics.add.sprite(700, 300, 'larve').setScale(0.75, 0.75);
        this.ennemis.add(this.en1)
        this.en1.pv = 3
        console.log(this.en1.pv)

        this.en2 = this.physics.add.sprite(150, 500, 'larve').setScale(0.75, 0.75);
        this.ennemis.add(this.en2)
        this.en2.pv = 3
        console.log(this.en2.pv)

        this.en3 = this.physics.add.sprite(450, 500, 'larve').setScale(0.75, 0.75);
        this.ennemis.add(this.en3)
        this.en3.pv = 3
        console.log(this.en3.pv)


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
            key: 'gigote',
            frames: this.anims.generateFrameNumbers('larve', { start: 0, end: 3 }),
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
        this.physics.add.collider(this.player, this.mur_1);
        this.physics.add.collider(this.player, this.meubles_1);
        this.physics.add.collider(this.player, this.meubles_2);

        this.physics.add.collider(this.en1, this.mur_1);
        this.physics.add.collider(this.en2, this.mur_1);
        this.physics.add.collider(this.en3, this.mur_1);

        this.mur_1.setCollisionByProperty({ estSolide: true });
        this.meubles_1.setCollisionByProperty({ estSolide: true });
        this.meubles_2.setCollisionByProperty({ estSolide: true });

        //colision bouton >> joueur :
        this.physics.add.overlap(this.player, this.bouton1, this.activation_1, null, this)

        this.physics.add.overlap(this.player, this.soins, this.heal, null, this)

        //colision ennemi >> bullet
        this.physics.add.overlap(this.ennemis, this.bullet1, this.killEn, null, this)

        //colision porte >> joueur :
        this.porte_A = this.physics.add.collider(this.player, this.portes1)
        this.porte_B = this.physics.add.collider(this.player, this.portes2)
        this.porte_C = this.physics.add.collider(this.player, this.portes3)
        this.porte_D = this.physics.add.collider(this.player, this.portes4)
        this.porte_E = this.physics.add.collider(this.player, this.portes5)
        this.porte_F = this.physics.add.collider(this.player, this.portes6)
        this.porte_G = this.physics.add.collider(this.player, this.portes7)
        this.porte_H = this.physics.add.collider(this.player, this.portes8)
        this.porte_I = this.physics.add.collider(this.player, this.portes9)
        this.porte_J = this.physics.add.collider(this.player, this.portes10)
        this.porte_K = this.physics.add.collider(this.player, this.portes11)
        this.porte_L = this.physics.add.collider(this.player, this.portes12)
        this.porte_M = this.physics.add.collider(this.player, this.portes13)

        this.pont_A = this.physics.add.collider(this.player, this.pont)

        //colision detection d'entrée au core.
        this.__Room = this.physics.add.overlap(this.player, this.RoomStarter, this.activation_2, null, this)
        // to next level
        this.physics.add.overlap(this.player, this.exit1, this.toLevel3, null, this)
        this.physics.add.overlap(this.player, this.exit2, this.toLevel4, null, this)

        this.physics.add.overlap(this.player, this.levier2, this.activation_4, null, this)
        this.physics.add.overlap(this.player, this.levier1, this.activation_6, null, this)

        //colision ennemi >> player
        this.physics.add.overlap(this.ennemis, this.player, this.takeDamage, null, this)

        //cam
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);

        //activate doors to open
        if (this.level2_door == true) {
            this.activation_3()
        }

        if (this.level2_LED_A) {
            this.light1GRPH.setFrame(1)
        }

        console.log("drone UNLOCK", this.droneUNL)

        this.getDrone = this.droneUNL

        if(this.droneUNL){
            this.droneINV.alpha = 1
        }

        this.en4ACT = false
        this.en5ACT = false
        this.en6ACT = false

        this.KeyB;
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)

        this.dronemode = false
        this.speed = 200

        this.playerPV = 4

        this.en
    }


    activation_1() {
        console.log("bouton 1")

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte1GRPH.setFrame(1)
            },
        })

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.porte1GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_A)
            },
        })
        
        

    }

    // =============================================
    //               UPDATE FONCTION
    // =============================================

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

                this.physics.add.overlap(this.drone, this.bouton1, this.activation_1, null, this)
                this.physics.add.overlap(this.drone, this.bouton2, this.activation_5, null, this)

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

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en1.x, this.en1.y) < 150) && this.en1.pv > 0) { this.larva(this.en1) }
        else if (this.en1.pv > 0) (this.en1.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en2.x, this.en2.y) < 150) && this.en2.pv > 0) { this.larva(this.en2) }
        else if (this.en2.pv > 0) (this.en2.setVelocityX(0).setVelocityY(0))

        if ((Phaser.Math.Distance.Between(this.player.x, this.player.y, this.en3.x, this.en3.y) < 150) && this.en3.pv > 0) { this.larva(this.en3) }
        else if (this.en3.pv > 0) (this.en3.setVelocityX(0).setVelocityY(0))

        if (this.en4ACT == true && this.en4.pv > 0) { this.zomb(this.en4) }
        else if (this.en4ACT == true && this.en4.pv > 0) (this.en4.setVelocityX(0).setVelocityY(0))

        if (this.en5ACT == true && this.en5.pv > 0) { this.zomb(this.en5) }
        else if (this.en5ACT == true && this.en5.pv > 0) (this.en5.setVelocityX(0).setVelocityY(0))

        if (this.en6ACT == true && this.en6.pv > 0) { this.zomb(this.en6) }
        else if (this.en6ACT == true && this.en6.pv > 0) (this.en6.setVelocityX(0).setVelocityY(0))

        if (this.en7ACT == true && this.en7.pv > 0) { this.zomb(this.en7) }
        else if (this.en7ACT == true && this.en7.pv > 0) (this.en7.setVelocityX(0).setVelocityY(0))
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

    killbullet(bullet1) {
        bullet1.destroy()
    }

    heal(pl ,soins){
        if(this.playerPV < 4){this.playerPV += 1}
        soins.destroy()
    }


    activation_2() {
        this.RoomStarter.setVelocityY(-6000)
        this.porte1GRPH.setVisible(true)
        this.porte_A = this.physics.add.collider(this.player, this.portes1)
        this.porte1GRPH.setFrame(1)

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte1GRPH.setFrame(0)
            },
        })

        //ennemi spawn 
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.en4 = this.physics.add.sprite(700, 650, 'zombie');
                this.ennemis.add(this.en4)
                this.en4.pv = 5
                console.log(this.en4.pv)

                this.en4ACT = true


                this.tweens.add({
                    targets: this.texte,
                    alpha: 1,
                    duration: 250,
                    ease: 'Linear',
                    yoyo: false,
                    repeat: 0
                });
        
                this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        this.tweens.add({
                            targets: this.texte,
                            alpha: 0,
                            duration: 250,
                            ease: 'Linear',
                            yoyo: false,
                            repeat: 0
                        });
                    },
                })
            },
        })

        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.en5 = this.physics.add.sprite(900, 650, 'zombie');
                this.ennemis.add(this.en5)
                this.en5.pv = 5
                console.log(this.en5.pv)

                this.en5ACT = true
            },
        })

        this.time.addEvent({
            delay: 7000,
            callback: () => {
                this.en6 = this.physics.add.sprite(700, 950, 'zombie');
                this.ennemis.add(this.en6)
                this.en6.pv = 5
                console.log(this.en6.pv)

                this.en6ACT = true
            },
        })
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.en7 = this.physics.add.sprite(900, 950, 'zombie');
                this.ennemis.add(this.en7)
                this.en7.pv = 5
                console.log(this.en7.pv)

                this.en7ACT = true
            },
        })

        this.time.addEvent({
            delay: 15000,
            callback: () => {
                if (this.en4.pv <= 0 && this.en5.pv <= 0 && this.en6.pv <= 0 && this.en7.pv <= 0) {

                    this.en4 = this.physics.add.sprite(700, 650, 'zombie');
                    this.ennemis.add(this.en4)
                    this.en4.pv = 5
                    console.log(this.en4.pv)

                    this.en4ACT = true

                    this.en5 = this.physics.add.sprite(900, 650, 'zombie');
                    this.ennemis.add(this.en5)
                    this.en5.pv = 5
                    console.log(this.en5.pv)

                    this.en5ACT = true

                    this.en6 = this.physics.add.sprite(700, 950, 'zombie');
                    this.ennemis.add(this.en6)
                    this.en6.pv = 5
                    console.log(this.en6.pv)

                    this.en6ACT = true

                    this.en7 = this.physics.add.sprite(900, 950, 'zombie');
                    this.ennemis.add(this.en7)
                    this.en7.pv = 5
                    console.log(this.en7.pv)

                    this.en7ACT = true
                }

            },
        })

        this.time.addEvent({
            delay: 20000,

            callback: () => {
                this.activation_3()
            },
        })
    }

    toLevel3() {
        this.positionX = 192;
        this.positionY = 1584;
        this.scene.start("scene_3", {
            x: this.positionX,
            y: this.positionY,
        });
    }

    toLevel4() {
        this.positionX = 900;
        this.positionY = 128;
        this.level2_LED_A = true
        this.scene.start("scene_4", {
            x: this.positionX,
            y: this.positionY,
            LED_A: this.level2_LED_A,
        });
    }

    activation_4() {
        // lever anim
        this.time.addEvent({
            delay: 400,
            callback: () => {
                this.levier2GRPH.setFrame(1)
                this.porte8GRPH.setFrame(1)
                this.porte9GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 800,
            callback: () => {
                this.levier2GRPH.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 1200,
            callback: () => {
                this.porte8GRPH.setVisible(false);
                this.porte9GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_H)
                this.physics.world.removeCollider(this.porte_I)
                this.levier2GRPH.setFrame(3)
            },
        })
        this.time.addEvent({
            delay: 1600,
            callback: () => {
                this.levier2GRPH.setFrame(4)
                this.light1GRPH.setFrame(1)

                this.tweens.add({
                    targets: this.texteD,
                    alpha: 1,
                    duration: 250,
                    ease: 'Linear',
                    yoyo: false,
                    repeat: 0
                });
        
                this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        this.tweens.add({
                            targets: this.texteD,
                            alpha: 0,
                            duration: 250,
                            ease: 'Linear',
                            yoyo: false,
                            repeat: 0
                        });
                    },
                })
            },
        })

        
    }

    activation_5() {
        console.log("bouton pas le 2")

        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte13GRPH.setFrame(1)
            },
        })

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.porte13GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_M)
            },
        })
    }

    activation_6() {
        // lever anim
        this.time.addEvent({
            delay: 400,
            callback: () => {
                this.levier1GRPH.setFrame(1)
                this.porte11GRPH.setFrame(1)
                this.porte12GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 800,
            callback: () => {
                this.levier1GRPH.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 1200,
            callback: () => {
                this.porte11GRPH.setVisible(false);
                this.porte12GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_K)
                this.physics.world.removeCollider(this.porte_L)
                this.levier1GRPH.setFrame(3)
            },
        })
        this.time.addEvent({
            delay: 1600,
            callback: () => {
                this.levier1GRPH.setFrame(4)
                this.light2GRPH.setFrame(1)

                this.porte10GRPH.setFrame(1)

                this.pont.setVisible(true)
                this.physics.world.removeCollider(this.pont_A)
            },
        })
        this.time.addEvent({
            delay: 2100,
            callback: () => {
                this.porte10GRPH.setVisible(false)
                this.physics.world.removeCollider(this.porte_J)

                this.tweens.add({
                    targets: this.texteE,
                    alpha: 1,
                    duration: 250,
                    ease: 'Linear',
                    yoyo: false,
                    repeat: 0
                });
        
                this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        this.tweens.add({
                            targets: this.texteE,
                            alpha: 0,
                            duration: 250,
                            ease: 'Linear',
                            yoyo: false,
                            repeat: 0
                        });
                    },
                })
            },
        })
    }



};