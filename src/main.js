
var gameConfig = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },   
    scene: [bootScene]
}

var game = new Phaser.Game(gameConfig);
window.focus();
    