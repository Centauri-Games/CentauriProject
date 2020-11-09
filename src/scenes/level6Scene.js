class level6Scene extends Phaser.Scene{
    constructor(){
        super("level6Scene");
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/factory.png');
    }
    create(){
        this.add.sprite(960,540,'bg');
    }
    update(){
        
    }
}