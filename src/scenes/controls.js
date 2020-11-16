class controls extends Phaser.Scene{
    constructor(){
        super("controls");
    }

    init(data){
        this.am = data.am;
    }

    preload(){
        this.load.image('tutorial', 'assets/screens/Controles.png');
    }

    create(){
        this.add.sprite(960, 540, 'tutorial');
        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);
    }

    update(){

    }
}