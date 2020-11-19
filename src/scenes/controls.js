class controls extends Phaser.Scene{
    constructor(){
        super("controls");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){
    }

    create(){
        if (this.English){
            if(this.device == "desktop")
                this.add.sprite(960, 540, 'howToPlayEnglish');
            else
                this.add.sprite(960, 540, 'howToPlayMBEnglish');
        } else {
            if(this.device == "desktop")
                this.add.sprite(960, 540, 'howToPlay');
            else
                this.add.sprite(960, 540, 'howToPlayMB');
        }
        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);

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