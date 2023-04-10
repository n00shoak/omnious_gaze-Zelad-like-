
// ----- CLASSE SCENE_1 -----
// Chaque classe de scene est dans un fichier different (comme en prog objet en general)

class scene_1 extends Phaser.Scene {

    constructor() {
        super("scene_1");
    }

    // ----- INITIALISATION DES DONNEES DU JOUEUR -----
    // A chaque fonction changement de scene on donnera des donnees qui seront transmises a la nouvelle scene
    // pour par exemple donner la position du joueur, ses points de vie, les objets qu'il a en sa possession etc
    init(data) {

        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y;

        this.level2_door = data.__door
        this.level2_LED_A = data.LED_A
        this.level2_LED_B = data.LED_B
    }

    // =============================================
    //               PRELOAD FONCTION
    // =============================================

    preload() {
        // - - - load var - - -
        this.ouvert1 = false



        // - - - load pictures - - -
        this.load.image("bouton", "assets/texture/boutonSprite.png");
        this.load.image("bullet", "assets/texture/bulletSprite.png");
        this.load.image("blood", "assets/texture/bloodSprite.png");
        this.load.image("texteA", "assets/texture/texteA.png");
        this.load.image("gun", "assets/texture/GunSprite.png");
        this.load.image("soins", "assets/texture/soins.png");
        this.load.spritesheet("doors", "assets/texture/doorsSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("fatDoors", "assets/texture/fatDoorSprite.png", { frameWidth: 48, frameHeight: 16 });
        this.load.spritesheet("levier", "assets/texture/leverSprite.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("larve", "assets/texture/ennemiSprite.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("health", "assets/texture/healthSprite.png", { frameWidth: 64, frameHeight: 16 });


        // - - - add player - - -
        this.load.spritesheet('character', 'assets/texture/CharacterSprite.png', { frameWidth: 32, frameHeight: 32 });

        // - - - add tilset - - -
        this.load.image("tileset_A", "El pallette.png");

        // - - - add maps - - - 
        this.load.tilemapTiledJSON("map_A", "assets/map/map zelda like .1.json");

        // - - - var - - -
        this.haveGun = false
        this.hurt = false
    }


    // =============================================
    //               CREATE FONCTION
    // =============================================

    create() {
        // - - - inputs - - -
        this.cursors = this.input.keyboard.createCursorKeys();


        //- - - loading map - - -
        const carteDuNiveau = this.add.tilemap("map_A");


        // - - - loading tilset - - - 
        const tilesetA = carteDuNiveau.addTilesetImage(
            "EL pallette",
            "tileset_A"
        );


        // - - - loading layers - - -
        const sous_sol = carteDuNiveau.createLayer("sous sol", tilesetA);
        const sol_1 = carteDuNiveau.createLayer("sol 1", tilesetA);
        const meubles_1 = carteDuNiveau.createLayer("meubles 2", tilesetA);
        const meubles_2 = carteDuNiveau.createLayer("meubles 1", tilesetA);
        this.mur_1 = carteDuNiveau.createLayer("mur 1", tilesetA);


        // - - - loading object - - - 

        //groupe :
        this.bouton1 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });
        this.bouton2 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });
        this.bouton3 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });

        this.levier1 = this.physics.add.group({
            allowGravity: false,
            imovable: true
        });

        this.portes1 = this.physics.add.staticGroup();
        this.portes2 = this.physics.add.staticGroup();
        this.portes3 = this.physics.add.staticGroup();
        this.portes4 = this.physics.add.staticGroup();

        this.ennemis = this.physics.add.group();

        this.Gun_1 = this.physics.add.staticGroup();
        this.bullet1 = this.physics.add.group();

        this._exit = this.physics.add.staticGroup();

        this.blood = this.physics.add.staticGroup();

        this.health = this.physics.add.staticGroup();
        this.soins = this.physics.add.staticGroup();

        carteDuNiveau.getObjectLayer('porte_1').objects.forEach((porte) => {
            const porte_1 = this.portes1.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte1GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte1GRPH.setFrame(0)
        });

        carteDuNiveau.getObjectLayer('porte_2').objects.forEach((porte) => {
            const porte_2 = this.portes2.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte2GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte2GRPH.setFrame(0)
        });

        carteDuNiveau.getObjectLayer('porte_3').objects.forEach((porte) => {
            const porte_3 = this.portes3.create(porte.x + 16, porte.y + 8).setVisible(false).setImmovable(false).setSize(32, 16);
            this.porte3GRPH = this.add.tileSprite(porte.x + 16, porte.y + 8, 32, 16, 'doors', 2);
            this.porte3GRPH.setFrame(0)
        });

        carteDuNiveau.getObjectLayer('porte_4').objects.forEach((porte) => {
            const porte_3 = this.portes4.create(porte.x + 24, porte.y + 8).setVisible(false).setImmovable(false).setSize(48, 16);
            this.porte4GRPH = this.add.tileSprite(porte.x + 24, porte.y + 8, 48, 16, 'fatDoors', 2);
            this.porte4GRPH.setFrame(0)
        });

        carteDuNiveau.getObjectLayer('bouton_1').objects.forEach((bouton) => {
            const bouton_1 = this.bouton1.create(bouton.x, bouton.y, 'bouton');
        });
        carteDuNiveau.getObjectLayer('bouton_2').objects.forEach((bouton) => {
            const bouton_2 = this.bouton2.create(bouton.x + 8, bouton.y + 8, 'bouton').rotation = 3.1;
        });
        carteDuNiveau.getObjectLayer('bouton_3').objects.forEach((bouton) => {
            const bouton_3 = this.bouton3.create(bouton.x + 8, bouton.y + 8, 'bouton').rotation = 3.1;
        });

        carteDuNiveau.getObjectLayer('levier_1').objects.forEach((levier) => {
            const levier_1 = this.levier1.create(levier.x + 8, levier.y + 16).setVisible(false).setImmovable(false).setSize(16, 32);
            this.levier1GRPH = this.add.tileSprite(levier.x + 8, levier.y + 16, 32, 16, 'levier', 2);
            this.levier1GRPH.setFrame(0).rotation = -1.6

        });

        carteDuNiveau.getObjectLayer('Gun_1').objects.forEach((Gun) => {
            const levier_1 = this.Gun_1.create(Gun.x + 8, Gun.y + 16).setVisible(false).setImmovable(false);
            this.Gun1GRPH = this.add.tileSprite(Gun.x + 8, Gun.y + 16, 32, 32, 'gun',);
        });

        carteDuNiveau.getObjectLayer('levelExit').objects.forEach((out) => {
            const level_Exit = this._exit.create(out.x + 8, out.y + 16).setVisible(false).setImmovable(false);
        });

        // - - - chargement du joueur - - -
        //base sprite
        this.player = this.physics.add.sprite(100, 700, 'character').setScale(0.65, 0.65);
        this.player.setCollideWorldBounds(true);

        // - - - loading ui - - -
        this.healthShow = this.add.tileSprite(960, 520, 64, 16, 'health').setScrollFactor(0).setScale(0.5, 0.5);
        this.texte = this.add.tileSprite(960, 620, 320, 64, 'texteA').setScrollFactor(0).setScale(0.5, 0.5);
        this.gunINV = this.add.tileSprite(710, 620, 32, 32, 'gun').setScrollFactor(0).setScale(1.5, 1.5);

        this.texte.alpha = 0
        this.gunINV.alpha = 0

        // - - - loading ennemis - - -
        this.en1 = this.physics.add.sprite(350, 500, 'larve').setScale(0.75, 0.75);
        this.ennemis.add(this.en1)
        this.en1.pv = 3
        console.log(this.en1.pv)

        this.en2 = this.physics.add.sprite(150, 500, 'larve').setScale(0.75, 0.75);
        this.ennemis.add(this.en2)
        this.en2.pv = 3
        console.log(this.en2.pv)

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


        // - - - collider - - -
        this.physics.add.collider(this.player, this.mur_1);
        this.physics.add.collider(this.en1, this.mur_1);
        this.physics.add.collider(this.en2, this.mur_1);
        this.mur_1.setCollisionByProperty({ estSolide: true });

        //cam
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);


        //colision :
        //colision bouton >> joueur :
        this.physics.add.overlap(this.player, this.bouton1, this.activation_1, null, this)
        this.physics.add.overlap(this.player, this.bouton2, this.activation_2, null, this)
        this.physics.add.overlap(this.player, this.bouton3, this.activation_3, null, this)

        //colision porte >> joueur :
        this.porte_A = this.physics.add.collider(this.player, this.portes1)
        this.porte_B = this.physics.add.collider(this.player, this.portes2)
        this.porte_C = this.physics.add.collider(this.player, this.portes3)
        this.porte_D = this.physics.add.collider(this.player, this.portes4)


        //colision ennemi >> bullet
        this.physics.add.overlap(this.ennemis, this.bullet1, this.killEn, null, this)

        //colision ennemi >> player
        this.physics.add.overlap(this.ennemis, this.player, this.takeDamage, null, this)

        //collision levier >> joueur :
        this.physics.add.overlap(this.player, this.levier1, this.activation_4, null, this)

        //collision colectilbe >> joueur :
        this.physics.add.overlap(this.player, this.Gun_1, this.GetGun, null, this)
        this.physics.add.overlap(this.player, this.soins, this.heal, null, this)

        //sortie du niveau :
        this.physics.add.overlap(this.player, this._exit, this.exit, null, this)

        this.KeyB;
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)

        this.gotGun = false
        this.en1PV = 3

        this.playerPV = 4
    }

    // =============================================
    //               UPDATE FONCTION
    // =============================================

    update() {
        this.dir
        this.speed = 200

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

        this.player.body.velocity.normalize().scale(this.speed);

        if (Phaser.Input.Keyboard.JustDown(this.keyB) && this.gotGun == true) {
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

        this.bullet_1 = this.blood.create(en.body.x + 8, en.body.y + 8, 'blood').setScale(0.3, 0.3).setAlpha(100).rotation = Phaser.Math.Between(0.1, 6.2);

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
            this.soins

            if (Phaser.Math.Between(1, 2) == 1) { this.soins.create(en.body.x, en.body.y, 'soins').setScale(1, 1); }

            en.destroy()
        }
    }

    killbullet(bullet1) {
        bullet1.destroy()
    }

    heal(pl, soins) {
        if (this.playerPV < 4) { this.playerPV += 1 }
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
                this.activation_1.destroy
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

    activation_3() {
        console.log("bouton 3")



        this.time.addEvent({
            delay: 500,
            callback: () => {
                this.porte3GRPH.setFrame(1)
            },
        })

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.porte3GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_C)
            },
        })
    }

    activation_4() {

        // lever anim
        this.time.addEvent({
            delay: 400,
            callback: () => {
                this.levier1GRPH.setFrame(1)
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
                this.levier1GRPH.setFrame(3)
            },
        })
        this.time.addEvent({
            delay: 1600,
            callback: () => {
                this.levier1GRPH.setFrame(4)
            },
        })
        //door anim
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.porte4GRPH.setFrame(1)
            },
        })
        this.time.addEvent({
            delay: 2400,
            callback: () => {
                this.porte4GRPH.setFrame(2)
            },
        })
        this.time.addEvent({
            delay: 2800,
            callback: () => {
                this.porte4GRPH.setFrame(3)
            },
        })
        this.time.addEvent({
            delay: 3200,
            callback: () => {
                this.porte4GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_D)
            },
        })
    }

    GetGun() {
        console.log("Got Gun")
        this.Gun1GRPH.setVisible(false);
        this.Gun_1.setVisible(false);
        this.gotGun = true
        this.gunINV.alpha = 1 // show in inventory

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
    }

    exit() {
        this.positionX = 32;
        this.positionY = 55 * 16;
        this.scene.start("scene_2", {
            x: this.positionX,
            y: this.positionY,
        });

        this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(2000);
        });

        this.time.addEvent({
            delay: 3200,
            callback: () => {
                this.porte4GRPH.setVisible(false);
                this.physics.world.removeCollider(this.porte_D)
            },
        })

    }
};