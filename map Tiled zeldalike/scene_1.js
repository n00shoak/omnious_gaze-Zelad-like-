
// ----- CLASSE SCENE_1 -----
// Chaque classe de scene est dans un fichier different (comme en prog objet en general)

class scene_1 extends Phaser.Scene{

    constructor(){
        super("scene_1");
    }

    // ----- INITIALISATION DES DONNEES DU JOUEUR -----
    // A chaque fonction changement de scene on donnera des donnees qui seront transmises a la nouvelle scene
    // pour par exemple donner la position du joueur, ses points de vie, les objets qu'il a en sa possession etc
    init(data) {

        // Position du sprite joueur
        this.positionX = data.x;
        this.positionY = data.y; 
    
    }

    // ==== preload fonction ====
    preload(){
        // - - -add object ---
        this.load.image("cursor", "cursor.png");
        this.load.image("bouton", "assets/texture/boutonSprite.png");
        this.load.image("gun", "assets/texture/GunSprite.png",{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("doors","assets/texture/doorsSprite.png",{ frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("levier","assets/texture/leverSprite.png",{ frameWidth: 16, frameHeight: 32 });
        
        // - - - add player - - -
        this.load.spritesheet('character','assets/texture/CharacterSprite.png', { frameWidth: 32, frameHeight: 32 });
        
        // - - - add tilset - - -
        this.load.image("tileset_A", "El pallette.png");
        
        // - - - add maps - - - 
        this.load.tilemapTiledJSON("map_A", "assets/map/map zelda like .1.json");

        // - - - var - - -
        this.haveGun = false
    }
    
    
    
    // ==== create fonction ====
    create(){
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
        const sous_sol = carteDuNiveau.createLayer( "sous sol" , tilesetA );
        const sol_1 = carteDuNiveau.createLayer( "sol 1" , tilesetA );
        const meubles_1 = carteDuNiveau.createLayer( "meubles 2" , tilesetA );
        const meubles_2 = carteDuNiveau.createLayer( "meubles 1" , tilesetA );
        const mur_1 = carteDuNiveau.createLayer( "mur 1" , tilesetA );
        
        
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

        this.Gun_1 = this.physics.add.staticGroup();

        //générateur d'object :
        var objectsLayer = carteDuNiveau.getObjectLayer('bouton_1')['bouton_1'];
        var objectsLayer = carteDuNiveau.getObjectLayer('bouton_2')['bouton_2'];
        var objectsLayer = carteDuNiveau.getObjectLayer('bouton_3')['bouton_3'];

        var objectsLayer = carteDuNiveau.getObjectLayer('levier_1')['levier_1'];

        var objectsLayer = carteDuNiveau.getObjectLayer('porte_1')['porte_1'];

        var objectsLayer = carteDuNiveau.getObjectLayer('Gun_1')['Gun_1'];

0

        carteDuNiveau.getObjectLayer('porte_1').objects.forEach((porte) =>{
            const porte_1 = this.portes1.create(porte.x+16,porte.y+8).setVisible(false).setImmovable(false);
            this.porte1GRPH = this.add.tileSprite(porte.x+16, porte.y+8, 32, 16, 'doors', 2);
        });

        carteDuNiveau.getObjectLayer('bouton_1').objects.forEach((bouton) =>{
            const bouton_1 = this.bouton1.create(bouton.x,bouton.y,'bouton');
        });
        carteDuNiveau.getObjectLayer('bouton_2').objects.forEach((bouton) =>{
            const bouton_2 = this.bouton2.create(bouton.x+8,bouton.y+8,'bouton').rotation = 3.1;
        });
        carteDuNiveau.getObjectLayer('bouton_3').objects.forEach((bouton) =>{
            const bouton_3 = this.bouton3.create(bouton.x+8,bouton.y+8,'bouton').rotation = 3.1;
        });

        carteDuNiveau.getObjectLayer('levier_1').objects.forEach((levier) =>{
            const levier_1 = this.levier1.create(levier.x+8,levier.y+16).setVisible(false).setImmovable(false);
            this.levier1GRPH = this.add.tileSprite(levier.x+8, levier.y+16, 32, 16, 'levier', 2).rotation = -1.6;
        });

        carteDuNiveau.getObjectLayer('Gun_1').objects.forEach((Gun) =>{
            const levier_1 = this.Gun_1.create(Gun.x+8,Gun.y+16).setVisible(false).setImmovable(false);
            this.Gun1GRPH = this.add.tileSprite(Gun.x+8, Gun.y+16, 32, 32, 'gun',);
        });


        // - - - chargement du joueur - - -
        //base sprite
        this.player = this.physics.add.sprite(100, 700, 'character');
        this.player.setCollideWorldBounds(true);
        
        // - - - animations - - - 
        //joueur :
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('character', {start:1,end:3}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character', {start:0,end:0}),
            frameRate: 10,
            repeat: -1
        });

        //objet:
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('doors', {start:0,end:2}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'activate',
            frames: this.anims.generateFrameNumbers('levier', {start:0,end:4}),
            frameRate: 10,
            repeat: -1
        });

        
        // - - - collider - - -
        this.physics.add.collider(this.player, mur_1);
        mur_1.setCollisionByProperty( {estSolide: true }); 

        //cam
        //this.cameras.main.startFollow(this.player);  
        //this.cameras.main.setZoom(2);


        //colision :
        //colision bouton >> joueur :
        this.physics.add.overlap(this.player, this.bouton1, this.activation_1, null, this)
        this.physics.add.overlap(this.player, this.bouton2, this.activation_1, null, this)
        this.physics.add.overlap(this.player, this.bouton2, this.activation_1, null, this)
        //colision porte >> joueur :
        this.physics.add.collider(this.player,this.portes1)
        //collision levier >> joueur :
        this.physics.add.overlap(this.player, this.levier1, this.activation_4, null, this)
        //collision arme colectilbe >> joueur :
        this.physics.add.overlap(this.player, this.Gun_1, (player,Gun_1) => {
            Gun_1.disableBody(true, true);
        },null, this);
        
    }
    
    // ==== update fonction ====
    update(){
        this.speed = 100
        
        //update Object
       
        
        // Faire en sorte que le joueur suive le pointeur
        this.input.on('pointermove', function (pointer) {
            this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
        }, this);
        
        
        if (this.cursors.up.isDown){ 
            this.player.setVelocityX(Math.cos(this.player.rotation) * this.speed);
            this.player.setVelocityY(Math.sin(this.player.rotation) * this.speed);
            this.player.anims.play('move', true); 
        }
        else if(this.cursors.down.isDown){
            this.player.setVelocityX(Math.cos(this.player.rotation) * -this.speed);
            this.player.setVelocityY(Math.sin(this.player.rotation) * -this.speed);
            this.player.anims.play('move', true); 
        }
        else if(this.cursors.left.isDown){
            this.player.setVelocityX(Math.cos(this.player.rotation + 89.5) * -this.speed);
            this.player.setVelocityY(Math.sin(this.player.rotation + 89.5) * -this.speed);
            this.player.anims.play('move', true); 
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(Math.cos(this.player.rotation - 89.5) * -this.speed);
            this.player.setVelocityY(Math.sin(this.player.rotation - 89.5) * -this.speed);
            this.player.anims.play('move', true); 
        }
        else{
            
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
        }
        
        //idle
        if(this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp){
            this.player.anims.play('idle', true);
        }
    }

    activation_1(){
        this.input.on('pointerup',() => {
            console.log("porte")
            this.porte1GRPH.anims.play('open')
        }, this);
    }

    activation_4(){
        this.input.on('pointerup',() => {
            console.log("porte")
        }, this);
    }
};