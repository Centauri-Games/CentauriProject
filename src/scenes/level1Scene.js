class level1Scene extends Phaser.Scene{
    constructor(){
        super("level1Scene");
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