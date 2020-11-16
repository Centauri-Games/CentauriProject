class menuScene extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
    }

    preload(){
        this.load.image('menu', 'assets/screens/Menú.png');
        this.load.image('screen', 'assets/UI/FullScreen.png');
        this.load.image('settings', 'assets/UI/Settings.png');
    }

    create(){
        this.add.sprite(960, 540, 'menu');
        this.add.image(1750, 125, 'screen').setScale(0.35).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        this.add.image(1750, 925, 'settings').setScale(0.08).setInteractive().on('pointerup',()=>{
            this.scene.start("settings", {am: this.am});
        });

        var bSingle = this.add.rectangle(292.5,125,450,100,0x550055).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("selectMode", {english: this.English, online : false, am: this.am});
        });
        bSingle.setAlpha(0.25);

        var bMulti = this.add.rectangle(292.5,340,450,100,0x550055).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("selectMode", {english: this.English, online : true, am: this.am});
        });
        bMulti.setAlpha(0.25);

        var bControls = this.add.rectangle(292.5,540,450,100,0xaa7f2a).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("controls", {english: this.English, online : true, am: this.am});
        });
        bControls.setAlpha(0.1);

        var bCredits = this.add.rectangle(292.5,740,450,100,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("credits", {english: this.English, online : true, am: this.am});
        });
        bCredits.setAlpha(0.25);

        var bRanking = this.add.rectangle(292.5,955,450,100,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            this.scene.start("controls", {english: this.English, online : true, am: this.am});
        });
        bRanking.setAlpha(0.25);

        if (this.English){
            mpText.setText("Cooperative online");
            spText.setText("Single player");
        }

        //Audio Manager
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