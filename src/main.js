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
            gravity: { y: 265 },
            debug: false
        }
    },
    input : {
        activePointers : 5
    },
    scene: [bootScene, menuScene, settings, controls, credits, selectLevel, selectMode, level1Scene, level2Scene,
        level3Scene, level4Scene, level5Scene, level6Scene, level7Scene,
        level8Scene, level9Scene,level10Scene, infiniteScene, gameOverScene, pauseScene, rankingScene,
        storyScene, endScene]
}

var game = new Phaser.Game(gameConfig);
window.focus();
    