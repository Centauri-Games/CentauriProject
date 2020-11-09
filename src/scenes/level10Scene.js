class level10Scene extends Phaser.Scene{
    constructor(){
        super("level10Scene");
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