class menuScene extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
        if (this.sys.game.device.os.desktop){
            this.device = "desktop";
        } else {
            this.device = "mobile";       
        }
    }

    preload(){
    }

    create(){
        if (this.English){
            this.add.sprite(960, 540, 'menuEnglish');
        } else {
            this.add.sprite(960, 540, 'menu');
        }
        var fullScreen = this.add.image(1875, 50, 'screen').setScale(0.2).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        fullScreen.setAlpha(0.01);

        var bSet = this.add.image(1875, 150, 'settings').setScale(0.04).setInteractive().on('pointerup',()=>{
            this.scene.start("settings", {english: this.English, am: this.am});
        });
        bSet.setAlpha(0.01);

        var bSingle = this.add.rectangle(292.5,125,450,100,0x550055).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("selectMode", {english: this.English, coop : false, am: this.am, device: this.device});
        });
        bSingle.setAlpha(0.25);

        var bMulti = this.add.rectangle(292.5,340,450,100,0x550055).setInteractive().on('pointerup',()=>{
            this.scene.start("selectMode", {english: this.English, coop : true, am: this.am, device: this.device});
        });
        bMulti.setAlpha(0.25);

        var bControls = this.add.rectangle(292.5,540,450,100,0xaa7f2a).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("controls", {english: this.English, am: this.am, device:this.device});
        });
        bControls.setAlpha(0.1);

        var bCredits = this.add.rectangle(292.5,740,450,100,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("credits", {english: this.English, online : true, am: this.am});
        });
        bCredits.setAlpha(0.25);

        var bRanking = this.add.rectangle(292.5,955,450,100,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("rankingScene", {english: this.English, online : true, am: this.am});
        });
        bRanking.setAlpha(0.25);

        //Audio Manager
        if(this.am==null){
            this.am = new AudioManager();
        }
        if (this.am.musicOn === true && this.am.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add("menuMS", { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.am.bgMusicPlaying = true;
            this.am.bgMusic = this.bgMusic; //Guarda la referencia a la musica sonando para después poder pararla
        }
    }

    update(){
        
    }
}