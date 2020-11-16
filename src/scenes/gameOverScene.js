class gameOverScene extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
    }

    init(data){
        this.level = data.level;
        this.English = data.english;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){

    }

    create(){
        //Reset música
        this.am.bgMusic.stop();
        this.am.bgMusicPlaying = false;

        var gText = this.add.text(800,250,"Fin de la partida",{font : "60px"});
        var rText = this.add.text(960,360,"Reintentar",{font : "48px"}).setInteractive().on("pointerup",()=>{
            
            this.scene.start(this.level, {english: this.English, am: this.am,device : this.device});
        });
        var bText = this.add.text(960,720,"Volver al menú",{font : "48px"}).setInteractive().on("pointerup",()=>{
            
            this.scene.start("menuScene", {english: this.English, am: this.am, device : this.device});
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