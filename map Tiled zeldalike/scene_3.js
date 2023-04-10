class scene_3 extends Phaser.Scene {
    constructor() {
        super("scene_3");
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
        this.load.image("texteC", "assets/texture/texteC.png");
        this.load.spritesheet("cam", "assets/texture/droneUi.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("valve", "assets/texture/valveSprite.png", { frameWidth: 16, frameHeight: 16 });
        this.load.image("gun", "assets/texture/GunSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("bullet", "assets/texture/bulletSprite.png");
        this.load.spritesheet("pchit", "assets/texture/smokeSprite.png", { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("doors", "assets/texture/doorsSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("fatDoors", "assets/texture/fatDoorSprite.png", { frameWidth: 48, frameHeight: 16 });
        this.load.spritesheet("levier", "assets/texture/leverSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("drone", "assets/texture/drone.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("zombie", "assets/texture/zombieSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("larve", "assets/texture/ennemiSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("health", "assets/texture/healthSprite.png", { frameWidth: 64, frameHeight: 16 });

        // - - - add player - - -
        this.load.spritesheet('character', 'assets/texture/CharacterSprite.png', { frameWidth: 32, frameHeight: 32 });

        // - - - add tilset - - -
        this.load.image("tileset_A", "El pallette.png");

        // - - - add maps - - - 
        this.load.tilemapTiledJSON("map_C", "assets/map/map zelda like 3.json");

        this.hurt = false
    }

    pchitA() {
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.jet1GRPH.setFrame(0)
                this.jet2GRPH.setFrame(0)
                this.jet3GRPH.setFrame(0)
                this.jet4GRPH.setFrame(0)
                this.jet5GRPH.setFrame(0)
                this.jet6GRPH.setFrame(0)
                this.jet7GRPH.setFrame(0)
                this.jet8GRPH.setFrame(0)
                this.jet9GRPH.setFrame(0)
                this.jet10GRPH.setFrame(0)
                this.jet11GRPH.setFrame(0)
                this.jet12GRPH.setFrame(0)
                this.jet13GRPH.setFrame(0)
                this.jet14GRPH.setFrame(0)
                this.jet15GRPH.setFrame(0)
                this.jet16GRPH.setFrame(0)
                this.jet17GRPH.setFrame(0)
                this.jet18GRPH.setFrame(0)

            },
        })
        this.time.addEvent({
            delay: 200,
            callback: () => {
                this.jet1GRPH.setFrame(1)
                this.jet2GRPH.setFrame(1)
                this.jet3GRPH.setFrame(1)
                this.jet4GRPH.setFrame(1)
                this.jet5GRPH.setFrame(1)
                this.jet6GRPH.setFrame(1)
                this.jet7GRPH.setFrame(1)
                this.jet8GRPH.setFrame(1)
                this.jet9GRPH.setFrame(1)
                this.jet10GRPH.setFrame(1)
                this.jet11GRPH.setFrame(1)
                this.jet12GRPH.setFrame(1)
                this.jet13GRPH.setFrame(1)
                this.jet14GRPH.setFrame(1)
                this.jet15GRPH.setFrame(1)
                this.jet16GRPH.setFrame(1)
                this.jet17GRPH.setFrame(1)
                this.jet18GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 300,
            callback: () => {
                this.jet1GRPH.setFrame(2)
                this.jet2GRPH.setFrame(2)
                this.jet3GRPH.setFrame(2)
                this.jet4GRPH.setFrame(2)
                this.jet5GRPH.setFrame(2)
                this.jet6GRPH.setFrame(2)
                this.jet7GRPH.setFrame(2)
                this.jet8GRPH.setFrame(2)
                this.jet9GRPH.setFrame(2)
                this.jet10GRPH.setFrame(2)
                this.jet11GRPH.setFrame(2)
                this.jet12GRPH.setFrame(2)
                this.jet13GRPH.setFrame(2)
                this.jet14GRPH.setFrame(2)
                this.jet15GRPH.setFrame(2)
                this.jet16GRPH.setFrame(2)
                this.jet17GRPH.setFrame(2)
                this.jet18GRPH.setFrame(2)
                this.pchitA()
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

    //====================================================================
    //                         FUNCTION CREATE
    //====================================================================

    create() {
        this.pchitA()
        this.vhsEFFECT()

        // - - - inputs - - -
        this.cursors = this.input.keyboard.createCursorKeys();

        //- - - loading map - - -
        const carteDuNiveau = this.add.tilemap("map_C");


        // - - - loading tilset - - - 
        const tilesetA = carteDuNiveau.addTilesetImage(
            "EL pallette",
            "tileset_A"
        );


        // - - - loading layers - - -
        const sol_4 = carteDuNiveau.createLayer("sol 4", tilesetA);
        const sol_3 = carteDuNiveau.createLayer("sol 3", tilesetA);
        const sol_2 = carteDuNiveau.createLayer("sol 2", tilesetA);
        const sol_1 = carteDuNiveau.createLayer("sol 1", tilesetA);
        const sol_0 = carteDuNiveau.createLayer("sol 0", tilesetA);
        this.meubles = carteDuNiveau.createLayer("meubles 1", tilesetA);
        this.mur_1 = carteDuNiveau.createLayer("mur 1", tilesetA);
        const mur_2 = carteDuNiveau.createLayer("mur 2", tilesetA);

        // - - - loading objects - - -
        this.bouton_1 = this.physics.add.staticGroup();
        this.bouton_2 = this.physics.add.staticGroup();
        this.bouton_3 = this.physics.add.staticGroup();
        this.bouton_4 = this.physics.add.staticGroup();
        this.bouton_5 = this.physics.add.staticGroup();
        this.bouton_6 = this.physics.add.staticGroup();
        this.bouton_7 = this.physics.add.staticGroup();

        this.valve_1 = this.physics.add.staticGroup();
        this.valve_2 = this.physics.add.staticGroup();
        this.valve_3 = this.physics.add.staticGroup();
        this.valve_4 = this.physics.add.staticGroup();
        this.valve_5 = this.physics.add.staticGroup();
        this.valve_6 = this.physics.add.staticGroup();
        this.valve_7 = this.physics.add.staticGroup();
        this.valve_8 = this.physics.add.staticGroup();
        this.valve_9 = this.physics.add.staticGroup();

        this.jet_1 = this.physics.add.staticGroup();
        this.jet_2 = this.physics.add.staticGroup();
        this.jet_3 = this.physics.add.staticGroup();
        this.jet_4 = this.physics.add.staticGroup();
        this.jet_5 = this.physics.add.staticGroup();
        this.jet_6 = this.physics.add.staticGroup();
        this.jet_7 = this.physics.add.staticGroup();
        this.jet_8 = this.physics.add.staticGroup();
        this.jet_9 = this.physics.add.staticGroup();
        this.jet_10 = this.physics.add.staticGroup();
        this.jet_11 = this.physics.add.staticGroup();
        this.jet_12 = this.physics.add.staticGroup();
        this.jet_13 = this.physics.add.staticGroup();
        this.jet_14 = this.physics.add.staticGroup();
        this.jet_15 = this.physics.add.staticGroup();
        this.jet_16 = this.physics.add.staticGroup();
        this.jet_17 = this.physics.add.staticGroup();
        this.jet_18 = this.physics.add.staticGroup();

        this.porte_1 = this.physics.add.staticGroup();
        this.porte_2 = this.physics.add.staticGroup();
        this.porte_3 = this.physics.add.staticGroup();
        this.porte_4 = this.physics.add.staticGroup();
        this.porte_5 = this.physics.add.staticGroup();

        this.droneUNLOCK = this.physics.add.staticGroup();

        this.level3OUT = this.physics.add.staticGroup();
        this.bullet1 = this.physics.add.group();

        this.ennemis = this.physics.add.group();

        this.blood = this.physics.add.staticGroup();

        this.camMode = this.physics.add.staticGroup();

        this.RoomStarter = this.physics.add.group({ allowGravity: false, imovable: true });

        this.health = this.physics.add.staticGroup();
        this.soins = this.physics.add.staticGroup();

        carteDuNiveau.getObjectLayer('level3OUT').objects.forEach((variable) => {
            const out = this.level3OUT.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(96, 16);
        });

        carteDuNiveau.getObjectLayer('enterTHEROOM').objects.forEach((variable) => {
            const valve1 = this.RoomStarter.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(64, 128);
        });

        carteDuNiveau.getObjectLayer('droneUNLOCK').objects.forEach((variable) => {
            const droneUNLOCK = this.droneUNLOCK.create(variable.x + 8, variable.y + 8, 'drone');
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
        carteDuNiveau.getObjectLayer('bouton_4').objects.forEach((variable) => {
            const _bouton4 = this.bouton_4.create(variable.x + 8, variable.y + 8, 'bouton');
        });
        carteDuNiveau.getObjectLayer('bouton_5').objects.forEach((variable) => {
            const _bouton5 = this.bouton_5.create(variable.x + 8, variable.y + 8, 'bouton');
        });
        carteDuNiveau.getObjectLayer('bouton_6').objects.forEach((variable) => {
            const _bouton6 = this.bouton_6.create(variable.x + 8, variable.y + 8, 'bouton');
        });
        carteDuNiveau.getObjectLayer('bouton_7').objects.forEach((variable) => {
            const _bouton7 = this.bouton_7.create(variable.x + 8, variable.y + 8, 'bouton');
        });


        carteDuNiveau.getObjectLayer('valve_1').objects.forEach((variable) => {
            const valve1 = this.valve_1.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve1GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve1GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('valve_2').objects.forEach((variable) => {
            const valve2 = this.valve_2.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve2GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve2GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('valve_3').objects.forEach((variable) => {
            const valve3 = this.valve_3.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve3GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve3GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('valve_4').objects.forEach((variable) => {
            const valve4 = this.valve_4.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve4GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve4GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('valve_5').objects.forEach((variable) => {
            const valve5 = this.valve_5.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve5GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve5GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('valve_6').objects.forEach((variable) => {
            const valve6 = this.valve_6.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve6GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve6GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('valve_7').objects.forEach((variable) => {
            const valve7 = this.valve_7.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve7GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve7GRPH.setFrame(0)
            this.valve7GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('valve_8').objects.forEach((variable) => {
            const valve8 = this.valve_8.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve8GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve8GRPH.setFrame(0)
            this.valve8GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('valve_9').objects.forEach((variable) => {
            const valve9 = this.valve_9.create(variable.x + 8, variable.y + 8).setVisible(false).setImmovable(false).setSize(18, 18);
            this.valve9GRPH = this.add.tileSprite(variable.x + 8, variable.y + 8, 16, 16, 'valve', 1).setScale(1.1, 1.1);
            this.valve9GRPH.setFrame(0)
            this.valve9GRPH.angle = 90;
        });

        carteDuNiveau.getObjectLayer('jet_1').objects.forEach((variable) => {
            const jet1 = this.jet_1.create(variable.x + 8, variable.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.jet1GRPH = this.add.tileSprite(variable.x + 8, variable.y + 16, 16, 32, 'pchit', 1);
            this.jet1GRPH.setFrame(0)
            this.jet1GRPH.angle = 180;
        });
        carteDuNiveau.getObjectLayer('jet_2').objects.forEach((variable) => {
            const jet2 = this.jet_2.create(variable.x + 8, variable.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.jet2GRPH = this.add.tileSprite(variable.x + 8, variable.y + 16, 16, 32, 'pchit', 1);
            this.jet2GRPH.setFrame(0)

        });
        carteDuNiveau.getObjectLayer('jet_3').objects.forEach((variable) => {
            const jet3 = this.jet_3.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet3GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet3GRPH.setFrame(0)
            this.jet3GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('jet_4').objects.forEach((variable) => {
            const jet4 = this.jet_4.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet4GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet4GRPH.setFrame(0)
            this.jet4GRPH.angle = -90;
        });
        carteDuNiveau.getObjectLayer('jet_5').objects.forEach((variable) => {
            const jet5 = this.jet_5.create(variable.x + 8, variable.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.jet5GRPH = this.add.tileSprite(variable.x + 8, variable.y + 16, 16, 32, 'pchit', 1);
            this.jet5GRPH.setFrame(0)
            this.jet5GRPH.angle = 180;
        });
        carteDuNiveau.getObjectLayer('jet_6').objects.forEach((variable) => {
            const jet6 = this.jet_6.create(variable.x + 8, variable.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.jet6GRPH = this.add.tileSprite(variable.x + 8, variable.y + 16, 16, 32, 'pchit', 1);
            this.jet6GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('jet_7').objects.forEach((variable) => {
            const jet7 = this.jet_7.create(variable.x + 8, variable.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.jet7GRPH = this.add.tileSprite(variable.x + 8, variable.y + 16, 16, 32, 'pchit', 1);
            this.jet7GRPH.setFrame(0)

        });
        carteDuNiveau.getObjectLayer('jet_8').objects.forEach((variable) => {
            const jet8 = this.jet_8.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet8GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet8GRPH.setFrame(0)
            this.jet8GRPH.angle = -90;
        });
        carteDuNiveau.getObjectLayer('jet_9').objects.forEach((variable) => {
            const jet9 = this.jet_9.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet9GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet9GRPH.setFrame(0)
            this.jet9GRPH.angle = -90;
        });
        carteDuNiveau.getObjectLayer('jet_10').objects.forEach((variable) => {
            const jet10 = this.jet_10.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet10GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet10GRPH.setFrame(0)
            this.jet10GRPH.angle = -90;
        });
        carteDuNiveau.getObjectLayer('jet_11').objects.forEach((variable) => {
            const jet11 = this.jet_11.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet11GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet11GRPH.setFrame(0)
            this.jet11GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('jet_12').objects.forEach((variable) => {
            const jet12 = this.jet_12.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet12GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet12GRPH.setFrame(0)
            this.jet12GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('jet_13').objects.forEach((variable) => {
            const jet13 = this.jet_13.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet13GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet13GRPH.setFrame(0)
            this.jet13GRPH.angle = -90;
        });
        carteDuNiveau.getObjectLayer('jet_14').objects.forEach((variable) => {
            const jet14 = this.jet_14.create(variable.x + 8, variable.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.jet14GRPH = this.add.tileSprite(variable.x + 8, variable.y + 16, 16, 32, 'pchit', 1);
            this.jet14GRPH.setFrame(0)
            this.jet14GRPH.angle = 180;
        });
        carteDuNiveau.getObjectLayer('jet_15').objects.forEach((variable) => {
            const jet15 = this.jet_15.create(variable.x + 8, variable.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.jet15GRPH = this.add.tileSprite(variable.x + 8, variable.y + 16, 16, 32, 'pchit', 1);
            this.jet15GRPH.setFrame(0)
        });
        carteDuNiveau.getObjectLayer('jet_16').objects.forEach((variable) => {
            const jet16 = this.jet_16.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet16GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet16GRPH.setFrame(0)
            this.jet16GRPH.angle = -90;
        });
        carteDuNiveau.getObjectLayer('jet_17').objects.forEach((variable) => {
            const jet17 = this.jet_17.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet17GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet17GRPH.setFrame(0)
            this.jet17GRPH.angle = -90;
        });
        carteDuNiveau.getObjectLayer('jet_18').objects.forEach((variable) => {
            const jet18 = this.jet_18.create(variable.x + 16, variable.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.jet18GRPH = this.add.tileSprite(variable.x + 16, variable.y + 8, 16, 32, 'pchit', 1);
            this.jet18GRPH.setFrame(0)
            this.jet18GRPH.angle = -90;
        });

        carteDuNiveau.getObjectLayer('porte_1').objects.forEach((porte) => {
            const porte1 = this.porte_1.create(porte.x + 8, porte.y + 24).setVisible(false).setImmovable(false).setSize(16, 48);
            this.porte1GRPH = this.add.tileSprite(porte.x + 8, porte.y + 24, 48, 16, 'fatDoors', 2);
            this.porte1GRPH.setFrame(0)
            this.porte1GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('porte_2').objects.forEach((porte) => {
            const porte2 = this.porte_2.create(porte.x + 8, porte.y + 24).setVisible(false).setImmovable(false).setSize(16, 48);
            this.porte2GRPH = this.add.tileSprite(porte.x + 8, porte.y + 24, 48, 16, 'fatDoors', 2);
            this.porte2GRPH.setFrame(0)
            this.porte2GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('porte_3').objects.forEach((porte) => {
            const porte3 = this.porte_3.create(porte.x + 8, porte.y + 24).setVisible(false).setImmovable(false).setSize(16, 48);
            this.porte3GRPH = this.add.tileSprite(porte.x + 8, porte.y + 24, 48, 16, 'fatDoors', 2);
            this.porte3GRPH.setFrame(0)
            this.porte3GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('porte_4').objects.forEach((porte) => {
            const porte_4 = this.porte_4.create(porte.x + 8, porte.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.porte4GRPH = this.add.tileSprite(porte.x + 8, porte.y + 16, 32, 16, 'doors', 2);
            this.porte4GRPH.setFrame(0)
            this.porte4GRPH.angle = 90;
        });
        carteDuNiveau.getObjectLayer('porte_5').objects.forEach((porte) => {
            const porte_5 = this.porte_5.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte5GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte5GRPH.setFrame(0)
        });


        // - - - loading player - - -
        //base sprite
        this.player = this.physics.add.sprite(192, 1584, 'character').setScale(0.65, 0.65);

        // - - - loading ennemis - - - 
        this.en1 = this.physics.add.sprite(300, 900, 'larve').setScale(0.75, 0.75);
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

        // - - - loading ui - - -
        this.healthShow = this.add.tileSprite(960, 520, 64, 16, 'health').setScrollFactor(0).setScale(0.5, 0.5);
        this.sprite = this.add.tileSprite(960, 620, 1500, 1600, 'cam').setScrollFactor(0).setScale(0.5, 0.5);
        this.texte = this.add.tileSprite(960, 620, 320, 64, 'texteC').setScrollFactor(0).setScale(0.5,0.5);
        this.gunINV = this.add.tileSprite(710, 620, 32, 32, 'gun').setScrollFactor(0).setScale(1.5,1.5);
        this.droneINV = this.add.tileSprite(710, 580, 16, 16, 'drone').setScrollFactor(0).setScale(1.5,1.5);


        this.sprite.alpha = 0; // Définir l'opacité initiale à 0
        this.texte.alpha = 0;
        this.droneINV.alpha = 0;


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
            key: 'gigote',
            frames: this.anims.generateFrameNumbers('larve', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // - - - collider - - -
        this.mur_1.setCollisionByProperty({ estSolide: true });
        this.meubles.setCollisionByProperty({ estSolide: true });
        this.physics.add.collider(this.player, this.mur_1);
        this.physics.add.collider(this.player, this.meubles);

        this.physics.add.collider(this.en1, this.mur_1);
        this.physics.add.collider(this.en2, this.mur_1);
        this.physics.add.collider(this.en3, this.mur_1);


        //colision :
        //colision bouton >> joueur :
        this.porte_A = this.physics.add.collider(this.player, this.porte_1)
        this.porte_B = this.physics.add.collider(this.player, this.porte_2)
        this.porte_C = this.physics.add.collider(this.player, this.porte_3)
        this.porte_D = this.physics.add.collider(this.player, this.porte_4)
        this.porte_E = this.physics.add.collider(this.player, this.porte_5)

        this.jet_A = this.physics.add.collider(this.player, this.jet_1)
        this.jet_B = this.physics.add.collider(this.player, this.jet_2)
        this.jet_C = this.physics.add.collider(this.player, this.jet_3)
        this.jet_D = this.physics.add.collider(this.player, this.jet_4)
        this.jet_E = this.physics.add.collider(this.player, this.jet_5)
        this.jet_F = this.physics.add.collider(this.player, this.jet_6)
        this.jet_G = this.physics.add.collider(this.player, this.jet_7)
        this.jet_H = this.physics.add.collider(this.player, this.jet_8)
        this.jet_I = this.physics.add.collider(this.player, this.jet_9)
        this.jet_J = this.physics.add.collider(this.player, this.jet_10)
        this.jet_K = this.physics.add.collider(this.player, this.jet_11)
        this.jet_L = this.physics.add.collider(this.player, this.jet_12)
        this.jet_M = this.physics.add.collider(this.player, this.jet_13)
        this.jet_N = this.physics.add.collider(this.player, this.jet_14)
        this.jet_O = this.physics.add.collider(this.player, this.jet_15)
        this.jet_P = this.physics.add.collider(this.player, this.jet_16)
        this.jet_Q = this.physics.add.collider(this.player, this.jet_17)
        this.jet_R = this.physics.add.collider(this.player, this.jet_18)

        this.physics.add.collider(this.player, this.valve_1, this.vavle_jet_1, null, this)
        this.physics.add.collider(this.player, this.valve_2, this.vavle_jet_2, null, this)
        this.physics.add.collider(this.player, this.valve_3, this.vavle_jet_3, null, this)
        this.physics.add.collider(this.player, this.valve_4, this.vavle_jet_4, null, this)
        this.physics.add.collider(this.player, this.valve_5, this.finalValveA, null, this)
        this.physics.add.collider(this.player, this.valve_6, this.finalValveB, null, this)
        this.physics.add.collider(this.player, this.valve_7, this.finalValveC, null, this)
        this.physics.add.collider(this.player, this.valve_8, this.activation_7, null, this)
        this.physics.add.collider(this.player, this.valve_9, this.activation_9, null, this)

        this.bullet1 = this.physics.add.group();

        this.physics.add.overlap(this.player, this.soins, this.heal, null, this)

        //colision ennemi >> player
        this.physics.add.overlap(this.ennemis, this.player, this.takeDamage, null, this)

        //colision ennemi >> bullet
        this.physics.add.overlap(this.ennemis, this.bullet1, this.killEn, null, this)

        this.physics.add.overlap(this.player, this.droneUNLOCK, this.getDRONE, null, this)

        this.physics.add.overlap(this.player, this.level3OUT, this.OUT, null, this)

        this.physics.add.overlap(this.player, this.RoomStarter, this.activation_6, null, this)



        //cam
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);

        this.KeyB;
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)

        this.getDrone = this.droneUNL
        this.dronemode = false
        this.speed = 200
        this.playerPV = 4
    }

    //====================================================================
    //                         FUNCTION UPDATE
    //====================================================================

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

                this.healthShow.setVisible(false)

                this.tweens.add({
                    targets: this.sprite,
                    alpha: 1,
                    duration: 250,
                    ease: 'Linear',
                    yoyo: false,
                    repeat: 0
                });

                this.drone = this.physics.add.sprite(this.player.x, this.player.y, 'drone').setScale(0.5, 0.5);

                this.cameras.main.startFollow(this.drone);
                this.cameras.main.setZoom(5);

                this.physics.add.overlap(this.drone, this.bouton_1, this.activation_1, null, this)
                this.physics.add.overlap(this.drone, this.bouton_2, this.activation_2, null, this)
                this.physics.add.overlap(this.drone, this.bouton_3, this.activation_3, null, this)
                this.physics.add.overlap(this.drone, this.bouton_4, this.activation_4, null, this)
                this.physics.add.overlap(this.drone, this.bouton_5, this.activation_5, null, this)
                this.physics.add.overlap(this.drone, this.bouton_6, this.activation_10, null, this)
                this.physics.add.overlap(this.drone, this.bouton_7, this.activation_8, null, this)

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

                        this.dronemode = false
                        console.log("drone mode", this.dronemode)

                        this.tweens.add({
                            targets: this.sprite,
                            alpha: 0,
                            duration: 250,
                            ease: 'Linear',
                            yoyo: false,
                            repeat: 0
                        });


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

    zomb(en) {
        console.log("zombie moving")
        var angle = Phaser.Math.Angle.Between(en.x, en.y, this.player.x, this.player.y);
        en.rotation = angle
        en.anims.play('RAN', true)
        this.physics.moveToObject(en, this.player, 50);
    }

    killbullet(bullet1) {
        bullet1.destroy()
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

    heal(pl ,soins){
        if(this.playerPV < 4){this.playerPV += 1}
        soins.destroy()
    }

    getDRONE() {
        console.log("Got Drone")
        this.droneUNLOCK.setVisible(false)
        this.physics.world.removeCollider(this.droneUNLOCK)
        this.getDrone = true

        this.droneINV.alpha = 1;

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

    activation_1() {
        console.log("activation 1")
        //activate the door
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.porte3GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 2400,
            callback: () => {
                this.porte3GRPH.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 2800,
            callback: () => {
                this.porte3GRPH.setFrame(3)
            },
        })
        this.time.addEvent({
            delay: 3200,
            callback: () => {
                this.porte3GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_C)

            },
        })
    }


    activation_2() {
        console.log("activation 2")
        this.jet1GRPH.setVisible(false);
        this.jet2GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_A)
        this.physics.world.removeCollider(this.jet_B)
    }

    activation_3() {
        console.log("activation 3")
        this.jet3GRPH.setVisible(false);
        this.jet4GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_C)
        this.physics.world.removeCollider(this.jet_D)
    }

    activation_4() {
        console.log("activation 4")
        this.jet5GRPH.setVisible(false);
        this.jet6GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_E)
        this.physics.world.removeCollider(this.jet_F)
    }

    activation_5() {
        console.log("activation 5")
        this.jet7GRPH.setVisible(false);
        this.jet8GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_G)
        this.physics.world.removeCollider(this.jet_H)

        //activate the door
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.porte2GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 2400,
            callback: () => {
                this.porte2GRPH.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 2800,
            callback: () => {
                this.porte2GRPH.setFrame(3)
            },
        })
        this.time.addEvent({
            delay: 3200,
            callback: () => {
                this.porte2GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_B)

            },
        })
    }

    activation_6() {
        this.RoomStarter.setVelocityX(5000)

        this.porte_C = this.physics.add.collider(this.player, this.porte_3)
        this.porte3GRPH.setVisible(true);

        //ennemi spawn 
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.en4 = this.physics.add.sprite(650, 1250, 'zombie');
                this.ennemis.add(this.en4)
                this.en4.pv = 5
                console.log(this.en4.pv)

                this.en4ACT = true
            },
        })
        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.en5 = this.physics.add.sprite(900, 1250, 'zombie');
                this.ennemis.add(this.en5)
                this.en5.pv = 5
                console.log(this.en5.pv)

                this.en5ACT = true
            },
        })

        this.time.addEvent({
            delay: 7000,
            callback: () => {
                this.en6 = this.physics.add.sprite(650, 950, 'zombie');
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

        //activate the door
        this.time.addEvent({
            delay: 15000,
            callback: () => {
                this.porte3GRPH.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 10500,
            callback: () => {
                this.porte3GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 11000,
            callback: () => {
                this.porte3GRPH.setFrame(0)
            },
        })
        this.time.addEvent({
            delay: 11500,
            callback: () => {
                this.physics.world.removeCollider(this.porte_C)
            },
        })

        this.time.addEvent({
            delay: 500 + 7000,
            callback: () => {
                this.porte4GRPH.setFrame(1)
            },
        })

        this.time.addEvent({
            delay: 1000 + 7000,
            callback: () => {
                this.porte4GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_D)
            },
        })
    }

    vavle_jet_1() {
        console.log("valve 2")
        this.jet11GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_K)

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.jet11GRPH.setVisible(true);
                this.jet_K = this.physics.add.collider(this.player, this.jet_11)
            },
        })
    }

    vavle_jet_3() {
        console.log("valve 3")
        this.jet9GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_I)

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.jet9GRPH.setVisible(true);
                this.jet_I = this.physics.add.collider(this.player, this.jet_9)
            },
        })
    }
    vavle_jet_4() {
        console.log("valve 4")
        this.jet10GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_J)

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.jet10GRPH.setVisible(true);
                this.jet_J = this.physics.add.collider(this.player, this.jet_10)
            },
        })
    }
    vavle_jet_2() {
        console.log("valve 2")
        this.jet12GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_L)

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.jet12GRPH.setVisible(true);
                this.jet_L = this.physics.add.collider(this.player, this.jet_12)
            },
        })
    }

    activation_7() {
        this.jet13GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_M)
    }

    activation_8() {
        this.jet14GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_N)

    }

    activation_9() {
        this.jet15GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_O)
    }

    activation_10() {
        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte5GRPH.setFrame(1)
            },
        })

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.porte5GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_E)
            },
        })
    }

    finalValveA() {
        this.jet16GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_P)
    }

    finalValveB() {
        this.jet17GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_Q)
    }

    finalValveC() {
        this.jet18GRPH.setVisible(false);
        this.physics.world.removeCollider(this.jet_R)
    }

    OUT() {
        this.positionX = 1262;
        this.positionY = 16;
        this.level2_door = true;
        this.droneUNL = true

        this.scene.start("scene_2", {
            x: this.positionX,
            y: this.positionY,
            __door: this.level2_door,
            UNL: this.droneUNL,
        });
    }
};