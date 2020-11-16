class pauseScene extends Phaser.Scene{
    constructor(){
        super("pauseScene");
    }

    init(data){
        this.Level = data.level;
        this.English = data.english;
        
        this.device = data.device;
    }

    preload(){
        this.load.image('pause', 'assets/screens/Pausa.png');
    }

    create(){
        this.add.sprite(960, 540, 'pause').setScale(2, 2);
        this.rText = this.add.text(960,360,"Reanudar",{font : "48px"});
        this.bText = this.add.text(960,720,"Volver al menú",{font : "48px"});
        if (this.English){
            this.rText.setText("Resume");
            this.bText.setText("Back to menu");
        }

        this.rText.setInteractive().on("pointerup",()=>{
            this.scene.resume(this.Level);
        });
        this.bText.setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene", {english: this.English, device : this.device});
        });
    }

    update(){
      
    }
}