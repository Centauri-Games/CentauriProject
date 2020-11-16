class credits extends Phaser.Scene{
    constructor(){
        super("credits");
    }

    init(data){
        this.am = data.am;
    }

    preload(){
        this.load.image('credit', 'assets/screens/Contacto.png');
    }

    create(){
        this.add.sprite(960, 540, 'credit');
        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);
    }

    update(){

    }
}