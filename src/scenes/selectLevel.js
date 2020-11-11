class selectLevel extends Phaser.Scene{
    constructor(){
        super("selectLevel");
    }

    init(data){
        this.English = data.english;
        this.online = data.online;
        
    }

    preload(){

    }

    create(){

        
        var bText = this.add.text(100,1000,"Atrás",{font : "24px"}).setInteractive().on("pointerup",()=>{
           
            this.scene.start("selectMode", {english: this.English});
        });

        this.add.rectangle(320,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 1});
            }else{
                this.scene.start("level1Scene", {english: this.English});
            }
            
        });

        this.add.text(320,360,"1",{font : "24px", color : "black"});


        
        this.add.rectangle(640,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 2});
            }else{
            this.scene.start("level2Scene", {english: this.English});
            }
            
        });

        this.add.text(640,360,"2",{font : "24px", color : "black"});



        this.add.rectangle(960,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 3});
            }else{
            this.scene.start("level3Scene", {english: this.English});
            }
        });

        this.add.text(960,360,"3",{font : "24px", color : "black"});



        this.add.rectangle(1280,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 4});
            }else{
            this.scene.start("level4Scene", {english: this.English});
            }
        });

        this.add.text(1280,360,"4",{font : "24px", color : "black"});



        this.add.rectangle(1600,360,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 5});
            }else{
            this.scene.start("level5Scene", {english: this.English});
            }
        });

        this.add.text(1600,360,"5",{font : "24px", color : "black"});



        this.add.rectangle(320,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 6});
            }else{
            this.scene.start("level6Scene", {english: this.English});
            }
        });

        this.add.text(320,720,"6",{font : "24px", color : "black"});



        this.add.rectangle(640,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 7});
            }else{
            this.scene.start("level7Scene", {english: this.English});
            }
        });

        this.add.text(640,720,"7",{font : "24px", color : "black"});



        this.add.rectangle(960,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 8});
            }else{
            this.scene.start("level8Scene", {english: this.English});
            }
        });

        this.add.text(960,720,"8",{font : "24px", color : "black"});



        this.add.rectangle(1280,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 9});
            }else{
            this.scene.start("level9Scene", {english: this.English});
            }
        });

        this.add.text(1280,720,"9",{font : "24px", color : "black"});



        this.add.rectangle(1600,720,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 10});
            }else{
            this.scene.start("level10Scene", {english: this.English});
            }
        });

        this.add.text(1600,720,"10",{font : "24px", color : "black"});

        if (this.English){
            bText.setText("Back");
        }
    }

    
}