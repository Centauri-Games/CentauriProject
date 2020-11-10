class gameOverScene extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    init(data){
        this.English = data.english;
    }

    preload(){

    }

    create(){
        var gText = this.add.text(800,250,"Fin de la partida",{font : "60px"});
        var rText = this.add.text(960,360,"Reintentar",{font : "48px"}).setInteractive().on("pointerup",()=>{
            
            this.scene.start("infiniteScene", {english: this.English});
        });
        var bText = this.add.text(960,720,"Volver al menú",{font : "48px"}).setInteractive().on("pointerup",()=>{
            
            this.scene.start("menuScene", {english: this.English});
        });
        if (this.English){
            gText.setText("Game over");
            rText.setText("Retry");
            bText.setText("Back to menu");
        }
    }

    update(){
        
    }
}