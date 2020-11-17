class controls extends Phaser.Scene{
    constructor(){
        super("controls");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
    }

    preload(){
        this.load.image('howToPlay', 'assets/screens/Controles.png');
        this.load.image('howToPlayEnglish', 'assets/screens/ControlesIngles.png');
    }

    create(){
        if (this.English){
            this.add.sprite(960, 540, 'howToPlayEnglish');
        } else {
            this.add.sprite(960, 540, 'howToPlay');
        }
        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);
    }

    update(){

    }
}