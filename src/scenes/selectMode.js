class selectMode extends Phaser.Scene{

    constructor(){
        super("selectMode");
    }

    init(data){
        this.English = data.english;
        this.online = data.online;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){
        this.load.image('mode', 'assets/screens/SeleccionModo.png');
        this.load.image('modeEnglish', 'assets/screens/SeleccionModoIngles.png');
        this.load.image('screen', 'assets/UI/FullScreen.png');
    }

    create(){
        if (this.English){
            this.add.sprite(960, 540, 'modeEnglish');
        } else {
            this.add.sprite(960, 540, 'mode');
        }
        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);

        var fullScreen = this.add.image(1875, 50, 'screen').setScale(0.2).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        fullScreen.setAlpha(0.01);

        var bStory = this.add.rectangle(985,380,700,150,0x550055).setInteractive().on('pointerup',()=>{
            this.scene.start("selectLevel", {english: this.English, online : this.online, am: this.am, device : this.device});
        });
        bStory.setAlpha(0.25);

        var bInfinite = this.add.rectangle(985,700,700,150,0xffff00).setInteractive().on('pointerup',()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 0, am: this.am, device : this.device} )
            } else {
                this.scene.start("infiniteScene", {english: this.English, am: this.am, device : this.device});
            }
        });
        bInfinite.setAlpha(0.25);

        //Audio Manager
        if (this.am.musicOn === true && this.am.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add("menuMS", { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.am.bgMusicPlaying = true;
            this.am.bgMusic = this.bgMusic;
        }
    }

    update(){
        
    }
}