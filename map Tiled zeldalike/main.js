

// ----- CONFIGURATION INITIALE -----
var config = {

    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1000,
    },

    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    // Ajout des differentes scenes dans le jeu
    scene: [scene_0,scene_1, scene_2, scene_3, scene_4]

};


var game = new Phaser.Game(config);