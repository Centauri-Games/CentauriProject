class pauseScene extends Phaser.Scene{
    constructor(){
        super("pauseScene");
    }

    init(data){
        this.Level = data.level;
        this.English = data.english;

    }

    preload(){

    }

    create(){
        this.gText = this.add.text(800,250,"PAUSA",{font : "60px"});
        this.rText = this.add.text(960,360,"Reanudar",{font : "48px"});
        this.bText = this.add.text(960,720,"Volver al menú",{font : "48px"});
        if (this.English){
            this.gText.setText("PAUSED");
            this.rText.setText("Resume");
            this.bText.setText("Back to menu");
        }

        this.rText.setInteractive().on("pointerup",()=>{
            this.scene.resume(this.Level);
        });
        this.bText.setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English});
        });
    }

    update(){
    }
}