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

        var bYT = this.add.rectangle(610, 955, 180, 140).setInteractive().on('pointerup',()=>{
            window.open("https://www.youtube.com/channel/UCMPGHT6gt11RJQFEf30gTKg?view_as=subscriber", "_blank");
        });
        bYT.setAlpha(0.5);

        var bMail = this.add.rectangle(878, 950, 155, 140).setInteractive().on('pointerup',()=>{
            window.open("mailto:centaurigames2020@gmail.com", "_blank");
        });
        bMail.setAlpha(0.5);

        var bTw = this.add.rectangle(1105, 950, 150, 150).setInteractive().on('pointerup',()=>{
            window.open("https://twitter.com/GamesCentauri", "_blank");
        });
        bTw.setAlpha(0.5);

        var bGt = this.add.rectangle(1305, 950, 150, 150).setInteractive().on('pointerup',()=>{
            window.open("https://github.com/Centauri-Games", "_blank");
        });
        bGt.setAlpha(0.5);


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