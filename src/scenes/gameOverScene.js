class gameOverScene extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    init(data){
        this.level = data.level;
        this.English = data.english;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){
    }

    create(){
        //Reset música
        this.am.bgMusic.stop();
        this.am.bgMusicPlaying = false;

        if (this.English){
            this.add.sprite(960, 225, 'gameOverEnglish').setScale(2);
        } else {
            this.add.sprite(960, 225, 'gameOver').setScale(2);
        }

        var bRestart = this.add.rectangle(960,535,600,100,0x550055).setInteractive().on('pointerup',()=>{
            this.scene.start(this.level, {english: this.English, am: this.am,device : this.device});
        });
        bRestart.setAlpha(0.25);

        var bBack = this.add.rectangle(960,770,600,100,0xffff00).setInteractive().on('pointerup',()=>{
            this.scene.start("menuScene", {english: this.English, online : true, am: this.am});
        });
        bBack.setAlpha(0.25);
    }

    update(){
        
    }
}