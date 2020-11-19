class settings extends Phaser.Scene{
    constructor(){
        super("settings");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
    }

    preload(){
    }

    create(){
        if (this.English){
            this.add.sprite(960, 540, 'languageEnglish');
        } else {
            this.add.sprite(960, 540, 'language');
        }

        var spanish = this.add.image(600, 540, 'español').setInteractive().on('pointerup',()=>{
            this.scene.start("menuScene", {english: false, am: this.am});
        });
        spanish.setAlpha(0.01);

        var english = this.add.image(1375, 540, 'english').setInteractive().on('pointerup',()=>{
            this.scene.start("menuScene", {english: true, am: this.am});
        });
        english.setAlpha(0.01);

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