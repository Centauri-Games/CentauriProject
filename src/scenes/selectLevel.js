class selectLevel extends Phaser.Scene{
    constructor(){
        super("selectLevel");
    }

    init(data){
        this.English = data.english;
    }

    preload(){

    }

    create(){
        var bText = this.add.text(100,1000,"Atrás",{font : "24px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("selectMode", {english: this.English});
        });

        this.add.rectangle(320,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level1Scene");
        });

        this.add.text(320,360,"1",{font : "24px", color : "black"});


        
        this.add.rectangle(640,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level2Scene");
        });

        this.add.text(640,360,"2",{font : "24px", color : "black"});



        this.add.rectangle(960,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level3Scene");
        });

        this.add.text(960,360,"3",{font : "24px", color : "black"});



        this.add.rectangle(1280,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level4Scene");
        });

        this.add.text(1280,360,"4",{font : "24px", color : "black"});



        this.add.rectangle(1600,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level5Scene");
        });

        this.add.text(1600,360,"5",{font : "24px", color : "black"});



        this.add.rectangle(320,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level6Scene");
        });

        this.add.text(320,720,"6",{font : "24px", color : "black"});



        this.add.rectangle(640,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level7Scene");
        });

        this.add.text(640,720,"7",{font : "24px", color : "black"});



        this.add.rectangle(960,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level8Scene");
        });

        this.add.text(960,720,"8",{font : "24px", color : "black"});



        this.add.rectangle(1280,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level9Scene");
        });

        this.add.text(1280,720,"9",{font : "24px", color : "black"});



        this.add.rectangle(1600,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            this.scene.start("level10Scene");
        });

        this.add.text(1600,720,"10",{font : "24px", color : "black"});

        if (this.English){
            bText.setText("Back");
        }
    }

    
}