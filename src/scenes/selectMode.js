class selectMode extends Phaser.Scene{

    constructor(){
        super("selectMode");
    }

    preload(){

    }
    create(){

        this.add.text(100,1000,"Atrás",{font : "24px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("menuScene");
        });
        
        this.add.text(1650,100,"Pantalla Completa",{font : "24px"}).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen)
            {
             

                this.scale.stopFullscreen();
            }
            else
            {
           

                this.scale.startFullscreen();
            }
        });

        this.add.rectangle(960,360,800,200,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            console.log("Click");
            
            this.scene.start("selectLevel");
        });

        this.add.text(960,360,"Modo historia",{font : "24px",color : "black"});

        this.add.rectangle(960,720,800,200,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            console.log("Click");
            this.scene.start("infiniteScene");
            
        });
        this.add.text(960,720,"Modo infinito",{font : "24px",color : "black"});
    }
    update(){
        
    }
}