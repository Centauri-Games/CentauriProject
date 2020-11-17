class pauseScene extends Phaser.Scene{
    constructor(){
        super("pauseScene");
    }

    init(data){
        this.Level = data.level;
        this.English = data.english;
        
        this.device = data.device;
    }

    preload(){
        this.load.image('pause', 'assets/screens/Pausa.png');
        this.load.image('pauseEnglish', 'assets/screens/PausaIngles.png');
    }

    create(){
        if (this.English){
            this.add.sprite(885, 665, 'pauseEnglish').setScale(2);
        } else {
            this.add.sprite(885, 665, 'pause').setScale(2);
        }

        var bResume = this.add.rectangle(960,535,600,100,0x550055).setInteractive().on('pointerup',()=>{
            this.scene.switch(this.level);
            this.level.keyMovement.ESC.isDown = false;
        });
        bResume.setAlpha(0.25);

        var bBack = this.add.rectangle(960,770,600,100,0xffff00).setInteractive().on('pointerup',()=>{
            this.level.scene.restart();
            this.scene.start("menuScene", {english: this.English, online : true, am: this.am});
        });
        bBack.setAlpha(0.25);
    }

    update(){
      
    }
}