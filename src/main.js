
var gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },  
    scene: [menuScene,selectLevel,selectMode,level1Scene,infiniteScene,gameOverScene]
}

var game = new Phaser.Game(gameConfig);
window.focus();
    