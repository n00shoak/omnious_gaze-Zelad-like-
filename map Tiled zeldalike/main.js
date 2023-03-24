

// ----- CONFIGURATION INITIALE -----
var config = {
    type: Phaser.AUTO,
    width: 800, height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },

    // Ajout des differentes scenes dans le jeu (donc la toutes les prochaines scenes que tu fais tu les met la dedans)
    scene: [scene_1]
};


var game = new Phaser.Game(config);