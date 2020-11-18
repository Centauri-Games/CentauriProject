class credits extends Phaser.Scene{
    constructor(){
        super("credits");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
    }

    preload(){
        this.load.image('credit', 'assets/screens/Contacto.png');
        this.load.image('creditEnglish', 'assets/screens/ContactoIngles.png');
    }

    create(){
        if (this.English){
            this.add.sprite(960, 540, 'creditEnglish');
        } else {
            this.add.sprite(960, 540, 'credit');
        }
        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.am.bgMusic.stop();
            this.am.bgMusicPlaying = false;
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);

        //Audio Manager
        if(this.am==null){
            this.am = new AudioManager();
        }

        this.am.bgMusic.stop();
        this.am.bgMusicPlaying = false;

        if (this.am.musicOn === true && this.am.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add("creditsMS", { volume: 0.4, loop: true });
            this.bgMusic.play();
            this.am.bgMusicPlaying = true;
            this.am.bgMusic = this.bgMusic; //Guarda la referencia a la musica sonando para después poder pararla
        }
    }

    update(){

    }
}