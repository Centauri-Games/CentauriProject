class settings extends Phaser.Scene{
    constructor(){
        super("settings");
    }

    preload(){
        this.load.image('español', 'assets/UI/España.png');
        this.load.image('english', 'assets/UI/UK.png');
    }

    create(){
        this.add.text(375, 200, 'Español', {font : "48px"});
        this.add.image(500, 500, 'español').setInteractive().on('pointerup',()=>{
            this.scene.start("menuScene", {english: false});
        });

        this.add.text(1300, 200, 'English', {font : "48px"});
        this.add.image(1420, 500, 'english').setInteractive().on('pointerup',()=>{
            this.scene.start("menuScene", {english: true});
        });

        this.add.text(960, 900, 'Elige un idioma', {font : "48px"});
        this.add.text(960, 950, 'Choose a language', {font : "48px"});
    }

    update(){

    }
}