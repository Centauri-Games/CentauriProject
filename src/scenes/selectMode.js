class selectMode extends Phaser.Scene{

    constructor(){
        super("selectMode");
    }

    init(data){
        this.English = data.english;
        this.online = data.online;
        this.am = data.am;
    }

    preload(){
        this.load.image('screen', 'assets/UI/FullScreen.png');
    }

    create(){
        var bText = this.add.text(100,1000,"Atrás",{font : "24px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {am: this.am});
        });

        this.add.image(1750, 125, 'screen').setScale(0.35).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        var fsText = this.add.text(1625,250,"Pantalla completa",{font : "24px"});

        this.add.rectangle(960,360,800,200,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            console.log("Click");
            this.scene.start("selectLevel", {english: this.English,online : this.online, am: this.am});
        });
        var sText = this.add.text(960,360,"Modo historia",{font : "24px",color : "black"});

        this.add.rectangle(960,720,800,200,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            console.log("Click");
            if(this.online){
                this.scene.start("matchmakingScene", {level : 0, am: this.am} )
            }else{
                this.scene.start("infiniteScene", {english: this.English, am: this.am});
            }
            
        });
        var iText = this.add.text(960,720,"Modo infinito",{font : "24px",color : "black"});

        if (this.English){
            bText.setText("Back");
            fsText.setText("Full screen");
            sText.setText("Story mode");
            iText.setText("Endless mode");
        }

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