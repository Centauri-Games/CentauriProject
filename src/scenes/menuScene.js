class menuScene extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
    }

    preload(){
        this.load.image('screen', 'assets/UI/FullScreen.png');
        this.load.image('settings', 'assets/UI/Settings.png');
    }

    create(){
        this.add.image(1750, 125, 'screen').setScale(0.35).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        var fsText = this.add.text(1625,250,"Pantalla completa",{font : "24px"});

        this.add.image(200, 125, 'settings').setScale(0.08).setInteractive().on('pointerup',()=>{
            this.scene.start("settings", {am: this.am});
        });
        var sText = this.add.text(150,250,"Ajustes",{font : "24px"});

        this.add.rectangle(960,360,800,200,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);

            this.scene.start("selectMode", {english: this.English, online : true, am: this.am});
            console.log("Click");
        });
        var mpText = this.add.text(960,360,"Cooperativo en linea",{font : "24px", color : "black"});

        this.add.rectangle(960,720,800,200,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            console.log("Click");
            this.scene.start("selectMode", {english: this.English, online : false, am: this.am});
        });
        var spText = this.add.text(960,720,"Un jugador",{font : "24px",color : "black"});

        if (this.English){
            fsText.setText("Full screen");
            sText.setText("Settings");
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