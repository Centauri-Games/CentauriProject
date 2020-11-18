class pauseScene extends Phaser.Scene{
    constructor(){
        super("pauseScene");
    }

    init(data){
        this.level = data.level;
        this.English = data.english;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){
        this.load.image('pause', 'assets/screens/Pausa.png');
        this.load.image('pauseEnglish', 'assets/screens/PausaIngles.png');
    }

    create(){
        this.am.bgMusic.pause();
        if (this.English){
            this.add.sprite(885, 665, 'pauseEnglish').setScale(2);
        } else {
            this.add.sprite(885, 665, 'pause').setScale(2);
        }

        var fullScreen = this.add.image(1390, 105, 'screen').setScale(0.2).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        fullScreen.setAlpha(0.01);

        var bResume = this.add.rectangle(960,535,600,100,0x550055).setInteractive().on('pointerup',()=>{
            this.scene.stop();
            this.am.bgMusic.resume();
            this.scene.resume(this.level);
        });
        bResume.setAlpha(0.25);

        var bBack = this.add.rectangle(960,770,600,100,0xffff00).setInteractive().on('pointerup',()=>{
            this.am.bgMusic.stop();
            this.am.bgMusicPlaying = false;
            this.scene.stop();
            this.scene.stop(this.level);
            this.scene.start("menuScene", {english: this.English, online : true, am: this.am, device: this.device});
        });
        bBack.setAlpha(0.25);
    }

    update(){
      
    }
}