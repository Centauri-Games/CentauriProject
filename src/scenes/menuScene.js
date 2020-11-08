
class menuScene extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){

    }
    create(){
        
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
            
            
        });

        this.add.text(960,360,"Cooperativo en linea",{font : "24px", color : "black"});

        this.add.rectangle(960,720,800,200,0xffff00).setInteractive().on('pointerup',()=>{
            //this.setFillStyle(0xffffff);
            console.log("Click");
            this.scene.start("selectMode");
            
        });
        this.add.text(960,720,"Un jugador",{font : "24px",color : "black"});

    }
    update(){
        
    }
}